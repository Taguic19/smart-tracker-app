import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import type { ReactNode } from "react";


type RouteGuardProps = {
    children: ReactNode;
    allowedRoles: string[];
}

const mappedRedirects: Record<string, string> = {
    USER: "/user-page",
    ADMIn: "/admin-page"
}

const redirectsTo = (role: string) => {
    return mappedRedirects[role] || "/";
}


const RouteGuard = ({children, allowedRoles}: RouteGuardProps) => {
    const {loading, isAuthenticated, user} = useAuthContext();
    
    if(loading) return <div>Loading...</div>;
    if(!isAuthenticated) return <Navigate to="/" replace/>;
    if(!allowedRoles.includes(user?.role!)) return <Navigate to={redirectsTo(user?.role!)} replace />
    return children;

}

export default RouteGuard;