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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';

export default function RideDetails({ ride }: any) {

    var mapIcon = L.icon({
        iconUrl: 'dest_icon.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [17, 43], // point of the icon which will correspond to marker's location
    });

    const stringDate = new Date(ride.created_at)

    function joinHandler(){
        console.log("Joined");
        
    }

    return (

        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="bg-blue-600 hover:bg-blue-900 font-poppins">
                        Details
                    </Button>
                </DialogTrigger>

                <DialogContent className="md:min-w-6xl w-full p-8 bg-white shadow-xl">
                    <DialogHeader className="mb-6 text-center">
                        <DialogTitle className="text-3xl font-bold text-gray-900 tracking-tight font-poppins">
                            Ride Details
                        </DialogTitle>
                        <DialogDescription className="mt-2 text-base text-gray-600 leading-relaxed">
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[80vh] pr-2">
                        <div className="flex flex-col md:flex-row gap-6 font-poppins">
                            <div className=" space-y-3">
                                <div className="text-m">

                                    <p className='text-3xl'>
                                        <span className="font-bold text-gray-700">Estimated Fare: </span>
                                        <span className="text-gray-800">₹ {ride.fare}</span>
                                    </p><br />

                                    <p className='text-xl'>
                                        <span className="font-medium text-gray-700">Distance: </span>
                                        <span className="text-gray-800">{ride.distance} km</span>
                                    </p><br />

                                    <p>
                                        <span className="font-bold text-gray-700">Request Time: </span>
                                        <span className="text-gray-800">{stringDate.toLocaleTimeString()}</span>
                                    </p><br />

                                    <p>
                                        <span className="font-bold text-gray-700">Source: </span> <br />
                                        <span className="text-gray-800">{ride.source.display_name}</span>
                                    </p><br />

                                    <p>
                                        <span className="font-bold text-gray-700">Destination: </span>
                                        <span className="text-gray-800">{ride.destination.display_name}</span>
                                    </p><br />

                                    <p>
                                        <span className="font-bold text-gray-700">Seats Needed:</span> <br />
                                        <span className="text-gray-800">{ride.passengers}</span>
                                    </p><br />
                                    <div className='flex justify-center'>
                                        <Button type="submit" onClick={joinHandler} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                            Join this ride
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            {/* Right: Map Section */}
                            <div className="w-full h-96 rounded-xl border shadow-md">
                                <MapContainer
                                    center={[ride.source_lat, ride.source_lng]}
                                    zoom={13}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <Marker position={[ride.source_lat, ride.source_lng]}>
                                        <Popup><b>Start</b></Popup>
                                    </Marker>

                                    <Marker position={[ride.dest_lat, ride.dest_lng]} icon={mapIcon} />
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Polyline positions={ride.route} color="blue" weight={4} opacity={0.7} />
                                </MapContainer>
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>

            </Dialog>
        </div>
    )
}
