import React, { useEffect } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import RideDetails from './RideDetails'

export default function RideCard({ ride }: any) {
    return (
        <div>
            <Card className="w-full max-w-xs shadow-md">
                <CardHeader>
                    <CardTitle>{ride.source.address.road} → {ride.destination.address.road}</CardTitle>
                    <CardDescription>
                        {ride.distance} km • ₹{ride.fare} • Seats: {ride.seats}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p>Time: {new Date(ride.time).toLocaleString()}</p>
                    <p>Status: {ride.status}</p>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline">Join</Button>
                    <RideDetails ride={ride}/>
                </CardFooter>
            </Card>

        </div>
    )
}
