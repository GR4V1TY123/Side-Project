import { create } from "zustand"
import { persist } from "zustand/middleware";

interface SmallAddress {
  road: string;
  suburb: string;
  city: string;
}


interface CoordsStore {
  lat: number
  lng: number
  setLat: (lat: number) => void
  setLng: (lng: number) => void
  address: string
  setAddress: (address: string) => void;
  smallAddress: SmallAddress
  setSmallAddress: (smallAddress: SmallAddress) => void,
  hasFetched: boolean,
  markFetched: () => void,
  resetLocation: () => void
}

export const useTrackLocation = create<CoordsStore>()(
  persist(
    (set) => ({
      lat: 19.23,
      lng: 72.85,
      address: "Address not available",
      smallAddress: { road: "NA", suburb: "NA", city: "NA" },
      hasFetched: false,

      setLat: (newLat) => set({ lat: newLat }),
      setLng: (newLng) => set({ lng: newLng }),
      setAddress: (newAddress) => set({ address: newAddress }),
      setSmallAddress: (newSmallAddress) => set({ smallAddress: newSmallAddress }),
      markFetched: () => set({ hasFetched: true }),
      resetLocation: () => {
        set({
          lat: 19.23,
          lng: 72.85,
          address: "Address not available",
          smallAddress: { road: "NA", suburb: "NA", city: "NA" },
          hasFetched: false,
        })
      }
    }),
    {
      name: "user-location-cache",
    }
  ))