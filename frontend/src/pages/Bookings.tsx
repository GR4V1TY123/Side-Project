import React from "react";
import { CalendarDays } from "lucide-react";

export default function Bookings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 text-center">
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md w-full">
        <CalendarDays className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Bookings</h1>
        <p className="text-gray-600">
          You have no active bookings yet.  
          Start exploring rides and book one that suits you.
        </p>
      </div>
    </div>
  );
}
