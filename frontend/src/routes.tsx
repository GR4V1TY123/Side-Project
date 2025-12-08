import ProtectedRoutes from './components/ProtectedRoutes';
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
        element: (
            < ProtectedRoutes >
                <Rides />
            </ProtectedRoutes >
        )
    },
    {
        path: "/profile",
        element: (
            < ProtectedRoutes >
                <Rides />
            </ProtectedRoutes >
        )
    },
    {
        path: "/bookings",
        element: (
            < ProtectedRoutes >
                <Bookings />
            </ProtectedRoutes >
        )
    },
    {
        path: "/rides/:id",
        element: <Rides />
    },
]
