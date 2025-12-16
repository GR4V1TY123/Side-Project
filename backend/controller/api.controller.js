export const geolocate = async (req, res) => {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
        return res.status(400).json({ message: "lat and lng required" });
    }
    try {
        const address = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`
        );
        const data = await address.json();
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while geolocating"
        })
    }
}

export const getRoute = async (req, res) => {
    const { slat, slng, elng, elat } = req.body;
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${slng},${slat};${elng},${elat}?overview=full&geometries=geojson`;
        const routesResponse = await fetch(url);
        const data = await routesResponse.json();

        if (data.routes && data.routes.length > 0) {
            const coordinates = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
            // setRoute(coordinates);
            const dist = data.routes[0].distance / 1000;
            // setDistanceKm(dist.toFixed(2));
            // setFormData((prev) => ({ ...prev, distance: dist.toFixed(2), route: coordinates }));
            
            return res.status(200).json({
                route: coordinates,
                distance: Number(dist.toFixed(2))
            })
        } else {
            return res.status(501).json({
                message: "Could not find route for the given coordinates"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while fetching routes"
        })
    }
}