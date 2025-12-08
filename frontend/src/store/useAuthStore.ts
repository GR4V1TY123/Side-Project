import { create } from "zustand";

interface userInterface {
    name: string,
    email: string
}

interface authInterface {
    isAuthenticated: boolean,
    user: userInterface | null,
    login: (user: userInterface) => void,
    logout: () => void
}

export const useAuthStore = create<authInterface>((set) => ({
    isAuthenticated: false,
    user: {
        name: "",
        email: "",
    },
    login: (user) => set({ isAuthenticated: true, user: user }),
    logout: () => set({ isAuthenticated: false, user: null })
}))