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
import { ScrollArea } from "@/components/ui/scroll-area"
import addRideHook from "@/hooks/addRideHook";
import { Spinner } from "./ui/spinner";

function CreateRides() {
  const { lat, lng, address, collegeAddress, collegeLat, collegeLon } = useTrackLocation();
  const [points, setPoints] = useState<{ lat: number; lng: number }>() || null;
  const [open, setOpen] = useState(false); //for dialog closing
  const [loading, setLoading] = useState(false)
  const collegeAddres = "TSEC College, 37th Road, Linking Road Shopping area, Bandra West, Zone 3, Mumbai, Mumbai Suburban, Maharashtra, 400050, India"
  console.log(address);

  const initialForm = {
    seats: 1,
    fare: 26,
    destination: null,
    distance: 0,
    status: "ACTIVE",
    dest_lat: 0,
    dest_lng: 0,
    route: []
  }
  const [formData, setFormData] = useState(initialForm);

  const { addRideMutation } = addRideHook();

  // RICKSHAW FARE FORMULA 
  useEffect(() => {
    if (formData.distance > 1.50) {
      setFormData((prev) => ({
        ...prev,
        fare: Math.round((formData.distance - 1.5) * 17.14) + 26
      }))
    }
  }, [formData.distance])

  async function getRoute(dest: any) {
    try {
      const response = await fetch(`http://localhost:3000/thirdParty/api/v1/route`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elat: dest.lat,
          elng: dest.lng,
          slat: collegeLat,
          slng: collegeLon
        })
      })
      if (!response.ok) return null;
      const data = await response.json();
      setFormData((p) => ({ ...p, route: data.route, distance: data.distance }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const destAddress = await getLocationName(formData.dest_lat, formData.dest_lng);
    const finalData = {
      ...formData, destination: destAddress
    }
    addRideMutation.mutate(finalData, {
      onSuccess: () => {
        setFormData(initialForm)
        setOpen(false)
      },
      onSettled: () => {
        setLoading(false)
      }
    });
  };

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const newPoints = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPoints(newPoints);
        setFormData((prev) => ({
          ...prev,
          dest_lat: newPoints.lat,
          dest_lng: newPoints.lng,
        }));
        console.log(formData);
        getRoute(newPoints)
      },
    });
    return null;
  }

  return (
    <div className="flex justify-center  h-full w-full items-center px-6">
      <div className="flex flex-col rounded-2xl shadow-md border border-gray-200 mt-6">
        <div className="p-6 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Begin your ride
          </h1>
          {/* <p className="text-gray-600 text-center mb-6">
            <span className="font-bold">Your Address: </span> {address}
          </p> */}
          <p className="text-gray-600 text-center mb-6 px-8">
            <span className="font-bold">College Address: </span> {collegeAddres}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="m-6">
            <Button variant="default" className="bg-green-600 hover:bg-green-700 shadow-xl">
              + Create Ride
            </Button>
          </DialogTrigger>

          <DialogContent className="lg:min-w-6xl h-auto w-full p-8 bg-white shadow-xl">
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
            <ScrollArea className="max-h-[80vh] pr-3">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Form Section */}
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-4 md:w-1/2 bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm"
                >

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Fare (₹)</label>
                    <Input
                      name="fare"
                      type="number"
                      value={formData.fare}
                    />
                  </div>

                  <div className="col-span-2 flex gap-3 mt-4">
                    <Button type="submit" {...loading && { disabled: true }} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      {
                        loading ? <Spinner /> : "Add Ride"
                      }
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </form>

                {/* Right: Map Section */}
                <div className="flex flex-col lg:w-1/2 w-full h-96 rounded-xl overflow-hidden border shadow-md">
                  <MapContainer
                    center={[Number(collegeLat), Number(collegeLon)]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />
                    {formData.route.length > 0 && (
                      <Polyline positions={formData.route} color="blue" weight={4} opacity={0.7} />
                    )}
                    <Marker position={[Number(collegeLat), Number(collegeLon)]}>
                      <Popup>
                        Source <br />
                        Address: {collegeAddress}
                      </Popup>
                    </Marker>
                    {
                      points && (
                        <Marker position={[points.lat, points.lng]}>
                          <Popup>
                            🔴 Destination <br />
                            Lat: {points.lat.toFixed(5)} <br />
                            Lng: {points.lng.toFixed(5)}
                          </Popup>
                        </Marker>
                      )
                    }
                  </MapContainer>
                  <div className="flex justify-around text-gray-600 text-md">
                    <span>Distance: {formData.distance} km</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}

export default CreateRides;
