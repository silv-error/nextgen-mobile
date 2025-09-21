import { create } from "zustand";

const useStore = create((set) => ({
  authUser: false,
  setAuthUser: () => set({ authUser: true }),
}));

export default useStore;
