import { create } from "zustand";
import { getData, saveData } from "../utils/storage";

type StoreState = {
  history: {
    tabIndex?: any[];
  };
  isUpdating: boolean;
  lastBills: {
    tabIndex?: {
      rate: number;
      info: {
        previous: number;
        current: number;
        rate: number;
        sum: number;
        date: string;
      };
    };
  };
  getLastBills: () => Promise<void>;
  updateLastBills: (tabIndex: number, billData: any) => Promise<void>;
  saveBill: (tabIndex: number, bill: any) => Promise<void>;
  getHistory: (tabIndex: number) => Promise<void>;
  deleteLastBill: (tabIndex: number) => Promise<void>;
  updateLastBill: (tabIndex: number, bill: any) => Promise<void>;
};

const useStore = create<StoreState>((set, get) => ({
  lastBills: {},
  isUpdating: false,
  history: {},
  getLastBills: async () => {
    set({ lastBills: await getData("lastBills", "{}") });
  },
  updateLastBills: async (tabIndex, billData) => {
    const current: any = get().lastBills;
    set({
      lastBills: {
        ...current,
        [tabIndex]: { ...current[tabIndex], ...billData },
      },
      isUpdating: true,
    });
    await saveData("lastBills", current);
  },
  saveBill: async (tabIndex, bill) => {
    await performAction(tabIndex, (yearBills: any[]) =>
      addBill(yearBills, bill),
    );
  },
  getHistory: async (tabIndex) => {
    let history = await getData(tabIndex.toString(), "{}");
    set({
      history: { ...get().history, [tabIndex]: history },
      isUpdating: false,
    });
  },
  deleteLastBill: async (tabIndex) => {
    let newLastBill = await performAction(tabIndex, deleteLastBill);
    get().updateLastBills(tabIndex, { info: newLastBill });
    set({ isUpdating: true });
  },
  updateLastBill: async (tabIndex, bill) => {
    await performAction(tabIndex, (yearBills: any[]) =>
      updateLastBill(yearBills, bill),
    );
    set({ isUpdating: true });
  },
}));

async function performAction(tabIndex: number, handler: any) {
  let key = tabIndex.toString();
  let year = new Date().getFullYear();
  let utilityData = await getData(key, "{}");
  let currentYearBills = utilityData[year] ?? [];
  let bill = handler(currentYearBills);
  await saveData(key, { ...utilityData, [year]: currentYearBills });
  return bill;
}

function deleteLastBill(yearBills: any[]) {
  yearBills.pop();
  let newLastBill = yearBills[yearBills.length - 1];
  return newLastBill;
}

function addBill(yearBills: any[], bill: any) {
  yearBills.push(bill);
  return bill;
}

function updateLastBill(yearBills: any[], bill: any) {
  yearBills[yearBills.length - 1] = bill;
  return bill;
}

export default useStore;
