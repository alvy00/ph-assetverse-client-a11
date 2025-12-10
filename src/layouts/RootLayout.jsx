import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main content */}
            <main className="flex-1 px-4 lg:px-8 mt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
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
