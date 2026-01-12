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
  updateLastBills: (tabIndex: number, billData: any) => void;
  saveLastBills: () => Promise<void>;
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
  updateLastBills: (tabIndex, billData) => {
    const current: any = get().lastBills;
    set({
      lastBills: {
        ...current,
        [tabIndex]: { ...current[tabIndex], ...billData },
      },
    });
  },
  saveLastBills: async () => {
    await saveData("lastBills", get().lastBills);
    set({ isUpdating: true });
  },
  saveBill: async (tabIndex, bill) => {
    let key = tabIndex.toString();
    let year = new Date().getFullYear();
    let utilityData = await getData(key, "{}");
    let currentYearBills: any[] = utilityData[year] ?? [];
    currentYearBills.push(bill);
    await saveData(key, { ...utilityData, [year]: currentYearBills });
  },
  getHistory: async (tabIndex) => {
    let history = await getData(tabIndex.toString(), "{}");
    set({
      history: { ...get().history, [tabIndex]: history },
      isUpdating: false,
    });
  },
  deleteLastBill: async (tabIndex) => {
    let history = await getData(tabIndex.toString(), "{}");
    let currentYear = new Date().getFullYear();
    let yearBills: any[] = history[currentYear];
    yearBills.pop();
    let newLastBill = yearBills[yearBills.length - 1];
    get().updateLastBills(tabIndex, { info: newLastBill });
    await saveData(tabIndex.toString(), {
      ...history,
      [currentYear]: yearBills,
    });
    await get().saveLastBills();
  },
  updateLastBill: async (tabIndex, bill) => {
    let key = tabIndex.toString();
    let year = new Date().getFullYear();
    let utilityData = await getData(key, "{}");
    let currentYearBills: any[] = utilityData[year] ?? [];
    currentYearBills[currentYearBills.length - 1] = bill;
    await saveData(key, { ...utilityData, [year]: currentYearBills });
    set({ isUpdating: true });
  },
}));

export default useStore;
