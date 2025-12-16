/* eslint-disable no-unused-vars */
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const RootLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main content with animated page transitions */}
            <main className="flex-1 px-4 lg:px-8 mt-20">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={location.pathname} // triggers animation on route change
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;
