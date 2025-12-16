import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Confirmation() {

  const { ride_id } = useParams()

  const query = useQuery({
    queryKey: [ride_id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/v1/rides/${ride_id}`, { credentials: "include" })
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return undefined;
    },
    retry: 2,
  })
  console.log(query.data);


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      {/* Ride Info */}
      <h2 className="text-2xl font-bold text-gray-800">
        Ride Confirmation
      </h2>

      {/* Source */}
      <div className="flex flex-col">
        <span className="text-gray-500 font-medium">From:</span>
        <span className="text-gray-900">{query.data?.ride.source.display_name}</span>
      </div>

      {/* Destination */}
      <div className="flex flex-col">
        <span className="text-gray-500 font-medium">To:</span>
        <span className="text-gray-900">{query.data?.ride.destination.display_name}</span>
      </div>

      {/* Fare & Seats */}
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Fare: ₹{query.data?.ride.fare}</span>
        <span className="text-gray-700 font-medium">Seats: {query.data?.ride.seats}</span>
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <span className="text-gray-500 font-medium">Status:</span>
        <span className="text-green-600 font-semibold">{query.data?.ride.status}</span>
      </div>

      {/* Book Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow">
        Book Ride
      </button>
    </div>

  )
}
