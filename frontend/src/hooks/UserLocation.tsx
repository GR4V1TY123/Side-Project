import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useTrackLocation } from "../store/useTrackLocation";
import { getLocationName } from "./GetLocationName";

export default function useUserLocation() {
  const { lat, lng, setLat, setLng, setAddress, setSmallAddress } = useTrackLocation();
  
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 5000,
      watchPosition: false,
    });

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      setLat(latitude);
      setLng(longitude);

      console.log("📍 User coordinates:", latitude, longitude);

      (async () => {
        const address = await getLocationName(latitude, longitude);
        console.log("🏠 User address:", address);
        setAddress(address.display_name);
        const specifics= address.address;
        const smallAddress = {
          road: specifics.road || "NA",
          suburb: specifics.suburb || "NA",
          city: specifics.city || "NA"
        }
        setSmallAddress(smallAddress);
      })();
    }
  }, [coords]);

  if (!isGeolocationAvailable)
    return <p>Geolocation not supported on this device.</p>;

  if (!isGeolocationEnabled)
    return <p>Geolocation disabled in your browser.</p>;

  return null;
}
