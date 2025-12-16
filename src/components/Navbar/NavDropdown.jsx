/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const NavDropdown = ({ label, items, currentPath }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const isActive = items.some((item) => currentPath === item.url);

    return (
        <div className="relative" ref={ref}>
            <motion.button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded transition-all duration-200 font-medium ${
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
            >
                {label}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 min-w-[180px] bg-white shadow-lg rounded-md py-2 flex flex-col z-50"
                    >
                        {items.map((item, i) => (
                            <motion.li
                                key={item.url}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    to={item.url}
                                    className={`block px-4 py-2 rounded hover:bg-gray-100 ${
                                        currentPath === item.url
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-gray-700"
                                    }`}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavDropdown;
