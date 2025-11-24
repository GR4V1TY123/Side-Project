import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "../supabase/supabaseClient";
import { useRidesStore } from "../store/useRidesStore";
import { useTrackLocation } from "../store/useTrackLocation";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getLocationName } from "../hooks/GetLocationName";

function CreateRides() {
  const { addRide } = useRidesStore();
  const { lat, lng, address } = useTrackLocation();
  const [points, setPoints] = useState<{ lat: number; lng: number }[]>([]);
  const [route, setRoute] = useState([]);
  const [distanceKm, setDistanceKm] = useState(0);

  console.log(address);


  const [formData, setFormData] = useState({
    seats: 1,
    time: 200,
    fare: 26,
    source: "Mumbai",
    destination: "Mumbai",
    distance: 2,
    status: "active",
    passengers: 2,
    host_id: 178,
    source_lat: lat,
    source_lng: lng,
    dest_lat: 0,
    dest_lng: 0,
    route: route
  });

  useEffect(() => {
    if (distanceKm > 1.50) {
      setFormData((prev) => ({
        ...prev,
        fare: Math.round((distanceKm - 1.5) * 17.14) + 26
      }))
    }
  }, [distanceKm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeatChange = (value: string) => {
    setFormData((prev) => ({ ...prev, seats: Number(value) }));
  };

  async function getRoute(start, end) {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const coordinates = data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
      setRoute(coordinates);

      const dist = data.routes[0].distance / 1000;
      setDistanceKm(dist.toFixed(2));
      setFormData((prev) => ({ ...prev, distance: dist.toFixed(2), route: coordinates }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const srcAddress = await getLocationName(formData.source_lat, formData.source_lng);
    const destAddress = await getLocationName(formData.dest_lat, formData.dest_lng);
    const finalData = {
      ...formData, source: srcAddress, destination: destAddress
    }
  
  const { data, error } = await supabase.from("Rides").insert([finalData]).select();
  if (error) console.error(error);
  else {
    const newRide = data[0];
    addRide(newRide);
    console.log("Ride Created:", newRide);
  }
};

function MapClickHandler() {
  useMapEvents({
    click(e) {
      if (points.length < 2) {
        const newPoints = [...points, { lat: e.latlng.lat, lng: e.latlng.lng }];
        setPoints(newPoints);

        if (newPoints.length === 1) {
          setFormData((prev) => ({
            ...prev,
            source_lat: newPoints[0].lat,
            source_lng: newPoints[0].lng,
          }));
        } else if (newPoints.length === 2) {
          setFormData((prev) => ({
            ...prev,
            dest_lat: newPoints[1].lat,
            dest_lng: newPoints[1].lng,
          }));
          getRoute(newPoints[0], newPoints[1]);
        }
      } else {
        setPoints([{ lat: e.latlng.lat, lng: e.latlng.lng }]);
        setFormData((prev) => ({
          ...prev,
          source_lat: e.latlng.lat,
          source_lng: e.latlng.lng,
          dest_lat: 0,
          dest_lng: 0,
        }));
      }
    },
  });
  return null;
}

return (
  <div className="flex justify-center  h-full w-full items-center bg-gray-50 px-6">
    <div className="flex flex-col bg-gray-50 rounded-2xl shadow-md border border-gray-200 mt-6">
      <div className="p-6 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Begin your ride
        </h1>
        <p className="text-gray-600 text-center mb-6">
          <span className="font-bold">Your Address: </span> {address}
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            + Create Ride
          </Button>
        </DialogTrigger>

        <DialogContent className="min-w-6xl w-full p-8 bg-white shadow-xl">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
              Create a New Ride
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-gray-600 leading-relaxed">
              Enter your ride details and pick <span className="font-medium text-gray-800">two points on the map </span>
              one for <span className="text-green-600 font-medium">source</span> and one for
              <span className="text-red-600 font-medium"> destination</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Form Section */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 md:w-1/2 bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">Seats you need</label>
                <Select onValueChange={handleSeatChange} defaultValue={formData.seats.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select seats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Time</label>
                <Input name="time" value={formData.time} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Fare (₹)</label>
                <Input
                  name="fare"
                  type="number"
                  value={formData.fare}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Passengers needed</label>
                <Input
                  name="passengers"
                  type="number"
                  value={formData.passengers}
                  onChange={handleChange}
                />
              </div>



              <div>
                <label className="block text-gray-700 font-medium mb-1">Host ID</label>
                <Input
                  name="host_id"
                  type="number"
                  value={formData.host_id}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2 flex gap-3 mt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Add Ride
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>

            {/* Right: Map Section */}
            <div className="flex flex-col md:w-1/2 w-full h-96 rounded-xl overflow-hidden border shadow-md">
              <MapContainer
                center={[lat, lng]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {route.length > 0 && (
                  <Polyline positions={route} color="blue" weight={4} opacity={0.7} />
                )}
                {points.map((point, idx) => (
                  <Marker key={idx} position={[point.lat, point.lng]}>
                    <Popup>
                      {idx === 0 ? "🟢 Source" : "🔴 Destination"} <br />
                      Lat: {point.lat.toFixed(5)} <br />
                      Lng: {point.lng.toFixed(5)}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <div className="flex justify-around text-gray-600 text-md">
                <span>Distance: {formData.distance} km</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

  </div>
);
}

export default CreateRides;
