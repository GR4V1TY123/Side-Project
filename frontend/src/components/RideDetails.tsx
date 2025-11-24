import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import L from 'leaflet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from './ui/button';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';

export default function RideDetails({ ride }: any) {

    var mapIcon = L.icon({
        iconUrl: 'dest_icon.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [17, 43], // point of the icon which will correspond to marker's location
    });

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-green-600 hover:bg-green-700">
                        Details
                    </Button>
                </DialogTrigger>

                <DialogContent className="min-w-6xl w-full p-8 bg-white shadow-xl">
                    <DialogHeader className="mb-6 text-center">
                        <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight">
                            Ride Details
                        </DialogTitle>
                        <DialogDescription className="mt-2 text-base text-gray-600 leading-relaxed">
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left: Form Section */}
                        <div>
                            <p>Request made at {ride.created_at}</p>
                            <p>Estimated Fare: {ride.fare}</p>
                            <p>Source: {ride.source.display_name}</p>
                            <p>Destination: {ride.destination.display_name}</p>
                            <p>Estimated Distance: {ride.distance}</p>
                            <p>Seats needed: {ride.passengers}</p>






                        </div>
                        {/* Right: Map Section */}
                        <div className="flex flex-col md:w-1/2 w-full h-96 rounded-xl overflow-hidden border shadow-md">
                            <MapContainer
                                center={[ride.source_lat, ride.source_lng]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <Marker position={[ride.source_lat, ride.source_lng]}>
                                    <Popup><b>Start</b></Popup>
                                </Marker>

                                <Marker position={[ride.dest_lat, ride.dest_lng]}  icon={mapIcon}/>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Polyline positions={ride.route} color="blue" weight={4} opacity={0.7} />
                            </MapContainer>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
