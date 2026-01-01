import { create } from "zustand";

type StoreState = {};

const useStore = create<StoreState>((set, get) => ({}));

export default useStore;
