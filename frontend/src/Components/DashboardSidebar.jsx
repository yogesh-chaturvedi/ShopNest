import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    PlusCircle,
    List,
    ShoppingBag,
    LogOut,
    ExternalLink,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'


const DashboardSidebar = () => {

    const navigate = useNavigate()


    const navItems = [
        { name: "Add Items", path: "/dashboard/add-item", icon: PlusCircle },
        { name: "Listed Items", path: "/dashboard/items", icon: List },
        { name: "View Orders", path: "/dashboard/orders", icon: ShoppingBag },
    ];


    async function handleLogout() {
        try {
            const response = await axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_URL}/auth/logout`,
                withCredentials: true
            })

            const { message, success } = response.data;
            if (success) {
                toast(message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/')
            }
        }
        catch (error) {
            console.error('handleLogout error', error)
        }
    }

    return (
        <aside className="h-screen w-64 bg-blue-700 text-white flex flex-col justify-between shadow-lg">
            {/* Top Section */}
            <div>
                <div className="px-6 py-5 text-xl font-semibold border-b border-blue-600">
                    Admin Panel
                </div>

                <nav className="mt-6 flex flex-col gap-1 px-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${isActive
                                        ? "bg-blue-900 text-white"
                                        : "text-blue-100 hover:bg-blue-600 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-3 pb-5 flex flex-col gap-2">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-600 hover:text-white transition"
                >
                    <ExternalLink size={18} />
                    Visit Website
                </a>

                <button
                    onClick={() => { handleLogout() }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500 hover:text-white transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;

