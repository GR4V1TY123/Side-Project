import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RideCard from '../components/RideCard';
import CreateRides from '../components/CreateRides';
import { useTrackLocation } from '../store/useTrackLocation';
import UserLocation from '../hooks/UserLocation';
import { useEffect } from 'react';
import { useRidesStore } from '../store/useRidesStore';
import { supabase } from '../supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';

export default function Rides() {
  const { lat, lng, address } = useTrackLocation();
  const { rides, setRides } = useRidesStore()

  useEffect(() => {
    async function getRides() {
      let { data: Rides, error } = await supabase
        .from('Rides')
        .select('*')
      console.log(Rides, error);
      setRides(Rides)
    }
    getRides()
  }, [])

  // Don’t render map until location is available
  if (!lat || !lng) {
    return <p>Getting your location...</p>;
  }

  var mapIcon = L.icon({
    iconUrl: 'auto_map_icon.png',
    iconSize: [50, 50], // size of the icon
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
  });

  return (
    <div className='p-5'>
      {/* This component updates lat/lng + address automatically */}
      <UserLocation />



      <div className='grid grid-cols-2 items-center'>
        <div>
          <CreateRides />
        </div>
        <div>
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: '400px', width: '100%', zIndex: 0, borderRadius: '20px' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[lat, lng]}>
              <Popup>
                📍 <b>Your Location</b>
                <br />
                {address || "Fetching address..."}
              </Popup>
            </Marker>
            {
              rides.length > 0 && (
                rides?.map((ride, i) => (
                  <Marker
                    position={[ride.source_lat, ride.source_lng]}
                    key={ride.id}
                    icon={mapIcon}>
                    <Popup>
                      <b>Ride available</b><br />
                      <b>Fare: {ride.fare}</b><br />
                      <a href="">Click to view</a>
                    </Popup>
                  </Marker>
                ))
              )
            }
          </MapContainer>
        </div>
      </div>

      {
        Array.isArray(rides) && rides.length > 0 && (<div>
          <div className="grid grid-cols-4 gap-4 p-8">
            {rides?.map((ride, i) => (
              <div key={i}>
                <RideCard ride={ride} />
              </div>
            ))}
          </div>
        </div>)
      }

    </div >
  );
}
