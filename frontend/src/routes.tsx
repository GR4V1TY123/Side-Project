
import CreateRides from './components/CreateRides';
import Bookings from './pages/Bookings';
import Home from './pages/Home';
import Login from './pages/Login'
import Rides from './pages/Rides';
import SignUp from './pages/SignUp';

export const appRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/rides",
        element: <Rides />
    },
    {
        path: "/profile",
        element: <Rides />
    },
    {
        path: "/bookings",
        element: <Bookings />
    },
    {
        path: "/rides/:id", 
        element: <Rides />
    },
]
