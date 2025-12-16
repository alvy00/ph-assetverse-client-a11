/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    UserPlus,
    LogIn,
    LogOut,
    UserCircle,
    Home,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/assetverse.png";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import Avatar from "./components/Avatar";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogOut = () => {
        try {
            logOut();
            setMobileOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 bg-white`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <motion.img
                        src={logo}
                        alt="logo"
                        className="w-20 h-12 rounded-xl cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        to="/"
                        className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
        ${
            location.pathname === "/"
                ? "bg-primary text-white font-semibold shadow-md"
                : "bg-white text-gray-700 hover:bg-primary/10 hover:text-primary"
        }`}
                    >
                        <Home className="w-5 h-5" /> {/* optional icon */}
                        Home
                    </Link>

                    {user?.role === "employee" ? (
                        <NavDropdown
                            label="WorkspaceEM"
                            items={workspaceEMItems}
                            currentPath={location.pathname}
                        />
                    ) : (
                        <NavDropdown
                            label="WorkspaceHR"
                            items={workspaceHRItems}
                            currentPath={location.pathname}
                        />
                    )}
                </div>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-2">
                    {!user ? (
                        <>
                            <Link
                                to="/auth/registeremployee"
                                className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1"
                            >
                                <UserPlus className="w-4 h-4" />
                                Join as Employee
                            </Link>
                            <Link
                                to="/auth/registerhr"
                                className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1"
                            >
                                <UserPlus className="w-4 h-4" />
                                Join as HR
                            </Link>
                            <Link
                                to="/auth/login"
                                className="btn btn-outline btn-primary"
                            >
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
                                className="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-1"
                            >
                                <Avatar
                                    src={user.profileImg}
                                    name={user.name}
                                />
                            </Link>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-outline btn-error"
                            >
                                Sign out
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden z-60 relative"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <span></span> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                currentPath={location.pathname}
                user={user}
                onLogout={handleLogOut}
            />
        </motion.nav>
    );
};

export default Navbar;
