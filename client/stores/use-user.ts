import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
