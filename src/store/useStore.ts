import { create } from "zustand";
import { getData, saveData } from "../utils/storage";

type StoreState = {
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
};

const useStore = create<StoreState>((set, get) => ({
  lastBills: {},
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
  },
  saveBill: async (tabIndex, bill) => {
    let key = tabIndex.toString();
    let bills = await getData(key, "[]");
    bills.push(bill);
    await saveData(key, bills);
  },
}));

export default useStore;
