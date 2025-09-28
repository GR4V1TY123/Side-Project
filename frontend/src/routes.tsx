
import Home from './pages/Home';
import Login from './pages/Login'
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
    }
]
