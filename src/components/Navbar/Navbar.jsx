/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router";
import logo from "../../assets/assetverse.png";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [em, setEm] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        em: false,
        hr: false,
    });

    const handleLogOut = () => {
        try {
            logOut();
            toast.success("Logged out!");
        } catch (error) {
            console.error(error);
        }
    };

    // Shadow effect on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinkClasses = (path) =>
        `px-3 py-2 rounded transition-all duration-200 ${
            location.pathname === path
                ? "bg-base-200/70 font-semibold"
                : "hover:bg-base-200/50"
        }`;

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    };

    const mobileMenuVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    };

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-base-100/80 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            }`}
        >
            <div className="flex justify-between items-center px-4 lg:px-8 h-20">
                {/* Logo */}
                <Link to="/">
                    <motion.img
                        src={logo}
                        alt="logo"
                        height={85}
                        width={85}
                        className="border border-base-300 rounded-4xl cursor-pointer p-2"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link to="/">
                        <span className={navLinkClasses("/")}>Home</span>
                    </Link>

                    {/* WorkspaceEM Dropdown */}
                    <div className="relative">
                        <motion.button
                            className="px-3 py-2 rounded hover:bg-base-200/50 transition flex items-center gap-1"
                            onClick={() =>
                                setDropdownOpen((prev) => ({
                                    ...prev,
                                    em: !prev.em,
                                }))
                            }
                            whileHover={{ scale: 1.05 }}
                        >
                            WorkspaceEM <span className="ml-1">▼</span>
                        </motion.button>
                        <AnimatePresence>
                            {dropdownOpen.em && (
                                <motion.ul
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                    className="absolute left-0 mt-2 p-2 bg-base-100/90 backdrop-blur-md w-48 shadow-lg rounded-md flex flex-col space-y-1"
                                >
                                    <Link to="/dashboard/myassets">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            My Assets
                                        </li>
                                    </Link>
                                    <Link to="/dashboard/myteam">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            My Team
                                        </li>
                                    </Link>
                                    <Link to="/dashboard/requestasset">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            Request Asset
                                        </li>
                                    </Link>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* WorkspaceHR Dropdown */}
                    <div className="relative">
                        <motion.button
                            className="px-3 py-2 rounded hover:bg-base-200/50 transition flex items-center gap-1"
                            onClick={() =>
                                setDropdownOpen((prev) => ({
                                    ...prev,
                                    hr: !prev.hr,
                                }))
                            }
                            whileHover={{ scale: 1.05 }}
                        >
                            WorkspaceHR <span className="ml-1">▼</span>
                        </motion.button>
                        <AnimatePresence>
                            {dropdownOpen.hr && (
                                <motion.ul
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                    className="absolute left-0 mt-2 p-2 bg-base-100/90 backdrop-blur-md w-48 shadow-lg rounded-md flex flex-col space-y-1"
                                >
                                    <Link to="/dashboard/assetlist">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            Asset List
                                        </li>
                                    </Link>
                                    <Link to="/dashboard/addasset">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            Add Asset
                                        </li>
                                    </Link>
                                    <Link to="/dashboard/allrequests">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            All Requests
                                        </li>
                                    </Link>
                                    <Link to="/dashboard/employeelist">
                                        <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                            Employee List
                                        </li>
                                    </Link>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {!user ? (
                        <>
                            <Link to="/auth/registeremployee">
                                <span className="btn outline-primary">
                                    Join as Employee
                                </span>
                            </Link>
                            <Link to="/auth/registerhr">
                                <span className="btn outline-primary">
                                    Join as HR Manager
                                </span>
                            </Link>
                            <Link to="/auth/login">
                                <span className="btn outline-primary">
                                    Login
                                </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={em ? "/emprofile" : "hrprofile"}>
                                <button className="btn outline-primary">
                                    Profile
                                </button>
                            </Link>

                            <button
                                onClick={handleLogOut}
                                className="btn outline-primary"
                            >
                                LogOut
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden btn btn-ghost"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileMenuVariants}
                        className="lg:hidden flex flex-col p-4 space-y-2 bg-base-100/90 backdrop-blur-md shadow-lg"
                    >
                        <Link to="/">
                            <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                Home
                            </li>
                        </Link>
                        <Link to="/dashboard/myassets">
                            <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                My Assets
                            </li>
                        </Link>
                        <Link to="/dashboard/myteam">
                            <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                My Team
                            </li>
                        </Link>
                        <Link to="/dashboard/requestasset">
                            <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                Request Asset
                            </li>
                        </Link>
                        {!user ? (
                            <>
                                <Link to="/auth/registeremployee">
                                    <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                        Join as Employee
                                    </li>
                                </Link>
                                <Link to="/auth/registerhr">
                                    <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                        Join as HR Manager
                                    </li>
                                </Link>
                                <Link to="/auth/login">
                                    <li className="px-2 py-1 rounded hover:bg-base-200/50">
                                        Login
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <li>
                                <Link to={em ? "/emprofile" : "/hrprofile"}>
                                    <button className="px-2 py-1 rounded hover:bg-base-200/50">
                                        Profile
                                    </button>
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="btn px-2 py-1 rounded outline-red-500 w-full"
                                >
                                    LogOut
                                </button>
                            </li>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
