import { useAuthStore } from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}: any) {
    const {isAuthenticated} = useAuthStore()

    !isAuthenticated && <Navigate to={"/login"} replace />

    return children;
}
