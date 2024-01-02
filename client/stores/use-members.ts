import { create } from "zustand";
import { User } from "./use-user";

interface UserState {
  members: User[];
  setMembers: (members: User[]) => void;
}

export const useMembers = create<UserState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
