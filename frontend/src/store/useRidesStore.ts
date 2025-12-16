import { create } from "zustand";

interface Ride {
  id: number;
  source: string;
  destination: string;
  fare: number;
  seats: number;
  time: string;
  status: string;
  hostId: string;
  distance: string;
}

interface RidesStore {
  rides: Ride[];
  setRides: (rides: Ride[]) => void;
  addRide: (ride: Ride) => void;
}

export const useRidesStore = create<RidesStore>((set) => ({
  rides: [],
  setRides: (rides) => set({ rides }),
  addRide: (ride) =>
    set((state) => ({ rides: [...state.rides, ride] })),
}))