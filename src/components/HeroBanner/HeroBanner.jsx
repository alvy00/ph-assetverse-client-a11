/* eslint-disable no-unused-vars */
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import banner from "../../assets/banner.png";

const HeroBanner = () => {
    return (
        <section className="relative w-full h-[400px] md:h-[400px] lg:h-[650px] overflow-hidden mt-3 rounded-lg">
            {/* Background Image */}
            <motion.img
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-110"
                src={banner}
                alt="hero section banner"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.08 }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/70 flex flex-col justify-center items-start px-6 md:px-16 lg:px-32 space-y-4">
                {/* Heading */}
                <motion.h1
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    AssetVerse
                </motion.h1>

                {/* Typewriter Description */}
                <motion.p
                    className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Typewriter
                        options={{
                            strings: [
                                "Effortlessly manage all your company assets.",
                                "Track laptops, furniture, and accessories with total clarity.",
                                "Assign and monitor assets across your entire organization.",
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            cursor: "|",
                        }}
                    />
                </motion.p>

                {/* Buttons */}
                <motion.div
                    className="flex flex-wrap gap-4 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform"
                    >
                        Start Managing Assets
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transform"
                    >
                        See How It Works
                    </motion.button>
                </motion.div>

                {/* Subtext */}
                <motion.p
                    className="text-white/80 text-sm md:text-base mt-4 max-w-lg drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    Trusted by HR teams, IT departments, and fast-growing
                    companies to streamline asset management.
                </motion.p>
            </div>

            {/* Animated Circles */}
            <motion.div
                className="absolute -bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -top-20 left-5 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl"
                animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/20 rounded-full blur-xl"
                animate={{ y: [-10, 10, -10], x: [-10, 10, -10] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </section>
    );
};

export default HeroBanner;
