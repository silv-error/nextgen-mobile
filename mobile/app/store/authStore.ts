import { create } from "zustand";

const useStore = create((set) => ({
  authUser: null,
  setAuthUser: (authUser: any) => set({ authUser }),
  userType: "traveler",
  setUserType: (type: string) => set({ userType: type }),
}));

export default useStore;
