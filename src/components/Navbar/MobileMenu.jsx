/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserCircle, LogOut, LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";

const MobileMenu = ({ isOpen, onClose, currentPath, user, onLogout }) => {
    const workspaceEMItems = [
        { title: "My Assets", url: "/dashboard/myassets" },
        { title: "My Team", url: "/dashboard/myteam" },
        { title: "Request Asset", url: "/dashboard/requestasset" },
    ];

    const workspaceHRItems = [
        { title: "Asset List", url: "/dashboard/assetlist" },
        { title: "Add Asset", url: "/dashboard/addasset" },
        { title: "All Requests", url: "/dashboard/allrequests" },
        { title: "Employee List", url: "/dashboard/employeelist" },
    ];

    // Disable body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    {/* Slide-in menu */}
                    <motion.div
                        className="fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 p-4 flex flex-col"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold">
                                AssetVerse
                            </span>
                            <button onClick={onClose}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link
                                to="/"
                                onClick={onClose}
                                className={`px-3 py-2 rounded ${
                                    currentPath === "/"
                                        ? "bg-primary/10"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                Home
                            </Link>

                            {user?.role === "employee" ? (
                                <>
                                    <span className="font-semibold text-gray-500 uppercase text-xs">
                                        Employee Workspace
                                    </span>
                                    {workspaceEMItems.map((item) => (
                                        <Link
                                            key={item.url}
                                            to={item.url}
                                            onClick={onClose}
                                            className={`px-3 py-2 rounded ${
                                                currentPath === item.url
                                                    ? "bg-primary/10"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold text-gray-500 uppercase text-xs">
                                        HR Workspace
                                    </span>
                                    {workspaceHRItems.map((item) => (
                                        <Link
                                            key={item.url}
                                            to={item.url}
                                            onClick={onClose}
                                            className={`px-3 py-2 rounded ${
                                                currentPath === item.url
                                                    ? "bg-primary/10"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </>
                            )}

                            <div className="border-t my-3" />

                            {!user ? (
                                <>
                                    <Link
                                        to="/auth/registeremployee"
                                        onClick={onClose}
                                        className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        Join as Employee
                                    </Link>
                                    <Link
                                        to="/auth/registerhr"
                                        onClick={onClose}
                                        className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <UserPlus className="w-5 h-5" />
                                        Join as HR
                                    </Link>
                                    <Link
                                        to="/auth/login"
                                        onClick={onClose}
                                        className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={
                                            user.role === "employee"
                                                ? "/dashboard/emprofile"
                                                : "/dashboard/hrprofile"
                                        }
                                        onClick={onClose}
                                        className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <UserCircle className="w-5 h-5" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            onClose();
                                        }}
                                        className="px-3 py-2 rounded text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
