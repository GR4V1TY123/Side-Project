export async function getLocationName(lat: number, lng: number) {
    try {
        const res = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        return data || "Unknown location";
    } catch (err) {
        console.error("Error fetching address:", err);
        return "Address not found";
    }
}

