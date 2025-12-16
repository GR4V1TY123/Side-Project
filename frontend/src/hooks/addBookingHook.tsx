import { useRidesStore } from "@/store/useRidesStore";
import { useMutation } from "@tanstack/react-query";

export default function addBookingHook() {

    const addBookingMutation = useMutation({
        mutationFn: async (rideData: any) => {
            const response = await fetch(`http://localhost:3000/api/v1/addRide`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(rideData)
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed")
            }
            return data;
        },
        retry: 2,

        onSuccess: (data)=> {
            addRide(data.newRide);
        }
    })

    return {addRideMutation}
}