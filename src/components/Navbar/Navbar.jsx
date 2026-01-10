/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import {
    Menu,
    UserPlus,
    Home,
    Package,
    Users,
    FileText,
    PlusCircle,
    ClipboardList,
    MessageSquare,
    Layers,
    Phone,
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
    const [isHidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const refY = useRef(0);

    useMotionValueEvent(scrollY, "change", (y) => {
        const diff = y - refY.current;
        if (Math.abs(diff) > 50) {
            setHidden(diff > 0);
            refY.current = y;
        }
    });

    const handleLogOut = () => {
        try {
            logOut();
            setMobileOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const workspaceEMItems = useMemo(
        () => [
            {
                title: "My Assets",
                url: "/dashboard/myassets",
                icon: <Package className="w-4 h-4" />,
            },
            {
                title: "My Team",
                url: "/dashboard/myteam",
                icon: <Users className="w-4 h-4" />,
            },
            {
                title: "Request Asset",
                url: "/dashboard/requestasset",
                icon: <FileText className="w-4 h-4" />,
            },
        ],
        []
    );

    const workspaceHRItems = useMemo(
        () => [
            {
                title: "Asset List",
                url: "/dashboard/assetlist",
                icon: <ClipboardList className="w-4 h-4" />,
            },
            {
                title: "Add Asset",
                url: "/dashboard/addasset",
                icon: <PlusCircle className="w-4 h-4" />,
            },
            {
                title: "All Requests",
                url: "/dashboard/allrequests",
                icon: <FileText className="w-4 h-4" />,
            },
            {
                title: "Employee List",
                url: "/dashboard/employeelist",
                icon: <Users className="w-4 h-4" />,
            },
        ],
        []
    );

    return (
        <motion.nav
            animate={isHidden ? "hidden" : "visible"}
            variants={{
                hidden: { y: "-85%", transition: { duration: 0.3 } },
                visible: { y: "0%", transition: { duration: 0.3 } },
            }}
            className={`fixed w-full lg:w-3/4 z-50 md:backdrop-blur-2xl bg-white/50 shadow-md rounded-bl-xl rounded-br-xl`}
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
                <div className="text-white shadow-2xl hidden lg:flex items-center gap-4 border rounded-4xl px-4 py-1.5 bg-black/30">
                    <Link
                        to="/"
                        className={`px-2 py-1 hover:bg-black/50 rounded-4xl transition-all duration-400 flex items-center gap-2`}
                    >
                        <Home className="w-5 h-5" />
                        Home
                    </Link>

                    {user?.role === "employee" && (
                        <NavDropdown
                            label="WorkspaceEM"
                            items={workspaceEMItems}
                            currentPath={location.pathname}
                        />
                    )}

                    {user?.role === "hr" && (
                        <NavDropdown
                            label="WorkspaceHR"
                            items={workspaceHRItems}
                            currentPath={location.pathname}
                        />
                    )}

                    <Link
                        to="/support"
                        className={`px-2 py-1 hover:bg-black/50 rounded-4xl transition-all duration-400 flex items-center gap-2`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Support
                    </Link>
                    <Link
                        to="/about"
                        className={`px-2 py-1 hover:bg-black/50 rounded-4xl transition-all duration-400 flex items-center gap-2`}
                    >
                        <Layers className="w-5 h-5" />
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`px-2 py-1 hover:bg-black/50 rounded-4xl transition-all duration-400 flex items-center gap-2`}
                    >
                        <Phone className="w-5 h-5" />
                        Contact
                    </Link>
                </div>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-2">
                    {!user ? (
                        <>
                            <Link
                                to="/auth/registeremployee"
                                className="px-3 py-2  hover:bg-black/10 transition-all duration-400 rounded-4xl flex items-center gap-1"
                            >
                                <UserPlus className="w-4 h-4" />
                                Join as Employee
                            </Link>
                            <Link
                                to="/auth/registerhr"
                                className="px-3 py-2  hover:bg-black/10 transition-all duration-400 rounded-4xl flex items-center gap-1"
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
                                className="px-3 py-2 rounded hover:scale-115 transition-all duration-400 flex items-center gap-1"
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
                    className="lg:hidden z-60 relative p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <span></span> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <MobileMenu
                        isOpen={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        currentPath={location.pathname}
                        user={user}
                        onLogout={handleLogOut}
                    />
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
