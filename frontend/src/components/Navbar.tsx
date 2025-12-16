import { Button } from "@/components/ui/button";
import { Menu, Car, CircleUserRound } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {

  const { user } = useAuthStore();

  return (
    <nav className="w-full bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Menu className="md:hidden h-6 w-6 cursor-pointer hover:text-yellow-400" />
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-yellow-400" />
          <span className="font-semibold text-lg tracking-wide">RideEase</span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="/rides" className="hover:text-yellow-400 transition-colors">Rides</a>
          <a href="/bookings" className="hover:text-yellow-400 transition-colors">Bookings</a>
          <a href="/about" className="hover:text-yellow-400 transition-colors">About</a>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center space-x-4">

          {!user ?
            <Button variant="outline" className="bg-yellow-300 text-black border-gray-500 hover:bg-yellow-600 hover:text-black hover:cursor-pointer">
              <a href="/login">Log In</a>
            </Button> :
            <a href="/profile" className="hover:text-yellow-400 transition-colors"><CircleUserRound /></a>
          }
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
