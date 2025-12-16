import { create } from "zustand";

interface userInterface {
    user_id: number,
    name: string,
    email: string,
}

interface authInterface {
    user: userInterface | null,
    login: (user: userInterface) => void,
    logout: () => void
}

export const useAuthStore = create<authInterface>((set) => ({
    user: null,
    login: (user) => {
        set({ user })
    },
    logout: () => {
        set({ user: null })
    }
}))