export async function getLocationName(lat: number, lng: number) {
    try {
        const res = await fetch(
            `http://localhost:3000/thirdParty/api/v1/geolocate`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lat: Number(lat), lng: Number(lng) })
            }
        );
        const data = await res.json();
        if (res.ok) return data;
        return "Address not found";
    } catch (err) {
        console.error("Error fetching address:", err);
        return "Server error";
    }
}

