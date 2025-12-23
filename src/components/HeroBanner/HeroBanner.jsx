/* eslint-disable no-unused-vars */
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import banner from "../../assets/hbanner.png";

const HeroBanner = () => {
    return (
        <section className="relative w-full h-[420px] lg:h-[620px] overflow-hidden rounded-2xl mt-6">
            {/* Background Image */}
            <motion.img
                src={banner}
                alt="AssetVerse Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.08 }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-white/30 via-white/10 to-white/40" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
                {/* Title */}
                <motion.h1
                    className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        font-bold
                        text-gray-900
                        leading-tight
                        tracking-tight
                    "
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    AssetVerse
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="
                        mt-4
                        text-base
                        sm:text-lg
                        lg:text-xl
                        text-gray-700
                        max-w-2xl
                    "
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <Typewriter
                        options={{
                            strings: [
                                "Manage and track company assets with confidence.",
                                "Know exactly who has what — anytime, anywhere.",
                                "Simplify asset assignments across your organization.",
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 45,
                            deleteSpeed: 25,
                            cursor: "|",
                        }}
                    />
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-8 flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-medium
                            px-6
                            py-3
                            rounded-lg
                            shadow-sm
                        "
                    >
                        Get Started
                    </motion.button>

                    <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="
                            bg-white
                            border
                            border-gray-300
                            hover:bg-gray-50
                            text-gray-800
                            font-medium
                            px-6
                            py-3
                            rounded-lg
                            shadow-sm
                        "
                    >
                        Learn More
                    </motion.button>
                </motion.div>

                {/* Trust Text */}
                <motion.p
                    className="mt-6 text-sm text-gray-600 max-w-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                >
                    Built for HR teams and IT departments to streamline asset
                    tracking, reduce losses, and stay organized.
                </motion.p>
            </div>
        </section>
    );
};

export default HeroBanner;
