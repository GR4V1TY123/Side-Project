import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RideCard from '../components/RideCard';
import CreateRides from '../components/CreateRides';
import { useTrackLocation } from '../store/useTrackLocation';
import UserLocation from '../hooks/UserLocation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRidesStore } from '@/store/useRidesStore';
import { Spinner } from '@/components/ui/spinner';

export default function Rides() {
  const { lat, lng, address, collegeAddress, collegeLat, collegeLon } = useTrackLocation();

  const [errorText, setErrorText] = useState("")
  const { rides, setRides } = useRidesStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['rides'],
    queryFn: async () => {
      const data = await fetch(`http://localhost:3000/api/v1/rides`)
      const rides = await data.json();
      console.log(rides);
      if (!data.ok) {
        setErrorText(rides?.message)
        return null;
      }
      setRides(rides)
      return rides
    },
    retry: 2,
    staleTime: 900000
  })

  if (error && errorText.length === 0) setErrorText(error?.message)
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
      {/*updates lat/lng + address automatically */}
      {/* <UserLocation /> */}


      <div className='grid grid-cols-2 items-center'>
        {/* Add ride component */}
        <div>
          <CreateRides />
        </div>

        {/* Map component */}
        <div>
          <MapContainer
            center={[Number(collegeLat), Number(collegeLon)]}
            zoom={13}
            style={{ height: '400px', width: '100%', zIndex: 0, borderRadius: '20px' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[Number(collegeLat), Number(collegeLon)]}>
              <Popup>
                📍 <b>College Location</b>
                <br />
                {collegeAddress || "Fetching address..."}
              </Popup>
            </Marker>

            {/* Map markers for rides */}
            {
              rides && rides.length > 0 && (
                rides?.map((ride: any) => (
                  <Marker
                    position={[ride.dest_lat, ride.dest_lng]}
                    key={ride.id}
                    icon={mapIcon}>
                    <Popup>
                      <b>{ride.destination.display_name?.split(',')[2]}</b><br />
                      <b>Fare: {ride.fare} Rs</b><br />
                      <a href="">Click to view</a>
                    </Popup>
                  </Marker>
                ))
              )
            }
          </MapContainer>
        </div>
      </div>

      {/* Rides List */}
      {
        isLoading ? (<div className='flex items-center justify-center'>
          <Spinner />
        </div>)
          :
          (rides && rides.length > 0) ? (<div>
            <div className="md:grid grid-cols-4 gap-4 p-8 items-center justify-center">
              {rides?.map((ride: any, i: any) => (
                <div key={i}>
                  <RideCard ride={ride} />
                </div>
              ))}
            </div>
          </div>) :
            (errorText) ? <span>{errorText}</span> : <span>No rides found</span>
      }

    </div >
  );
}
