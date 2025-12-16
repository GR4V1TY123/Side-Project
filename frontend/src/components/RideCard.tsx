import React, { useEffect } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import RideDetails from './RideDetails'

export default function RideCard({ ride }: any) { 

    return (
        <div>
            <Card className="w-full max-w-xs shadow-md">
                <CardHeader>
                    <CardTitle>{ride.source.display_name?.split(',')[0]} → <br />{ride.destination.display_name?.split(',')[0]}</CardTitle>
                    <CardDescription>
                        <p className='font-bold text-green-700 text-lg '>
                            ₹ {ride.fare}
                        </p>
                        {ride.distance} km • Seats: {ride.seats}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <span><span className='font-bold'>Time:</span> {new Date(ride.created_at).toLocaleTimeString()}</span>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <RideDetails ride={ride}/>
                </CardFooter>
            </Card>

        </div>
    )
}
