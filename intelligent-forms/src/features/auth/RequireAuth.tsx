import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth } : any = useAuth();
    const location = useLocation();

    // check constantly if localStorage has access_token
    
    return (
        ( localStorage.getItem('access_token') )
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;