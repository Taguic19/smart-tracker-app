import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import { NavLink } from "react-router-dom";

const AdminPage = () => {
    const {user} = useAuthContext();
    
    const navStyle = ({isActive}: {isActive: boolean}) => {
        return `border-b-4 border-transparent hover:border-black transition-all duration-150 pb-1 ${isActive? "border-b-black border-b-4" : ""}`;

    }


    return (
       <div className="flex flex-col h-screen bg-slate-200">
        <div className="h-30 m-3 bg-white flex flex-col justify-end pl-6">
            <h1 className="mb-2 text-2xl">Welcome, Admin {user?.email}</h1>
            <div className="flex gap-4 mb-2">
            <NavLink to="/admin-page" className={navStyle} end>Dashboard</NavLink>
            <NavLink to="/admin-page/tasks" className={navStyle}>Active Task</NavLink>
            <NavLink to="/admin-page/users" className={navStyle}>Users</NavLink>
            <NavLink to="/admin-page/settings" className={navStyle}>Settings</NavLink>
            </div>
        </div>
        <Outlet />
    </div>
    )
}

export default AdminPage;