/* eslint-disable no-unused-vars */
import { FiBox, FiEye, FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";

import efficient_asset from "../../assets/subscription.jpg";
import transparency from "../../assets/hrcompany.jpg";
import data_driven from "../../assets/tracking.jpg";

const AboutSection = () => {
    const items = [
        {
            img: efficient_asset,
            title: "Efficient Asset Tracking & Management",
            icon: <FiBox size={40} className="text-white drop-shadow-lg" />,
        },
        {
            img: transparency,
            title: "Transparency & Accountability",
            icon: <FiEye size={40} className="text-white drop-shadow-lg" />,
        },
        {
            img: data_driven,
            title: "Data-Driven Decision Making",
            icon: (
                <FiBarChart2 size={40} className="text-white drop-shadow-lg" />
            ),
        },
    ];

    // Framer Motion variants
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    };

    return (
        <section className="py-12 bg-base-200 rounded-lg">
            <div className="text-center mb-10">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    About Us
                </motion.h2>
                <motion.p
                    className="text-gray-600 mt-2 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    AssetVerse helps companies streamline HR & asset management
                    with powerful tracking, transparency, and data-driven
                    insights.
                </motion.p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative rounded-2xl overflow-hidden shadow-lg group bg-white cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        {/* Image */}
                        <motion.img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <motion.div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />

                        {/* Icon */}
                        <motion.div
                            className="absolute top-4 left-4 bg-primary/30 p-3 rounded-full"
                            whileHover={{ rotate: 10 }}
                        >
                            {item.icon}
                        </motion.div>

                        {/* Title */}
                        <motion.span
                            className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg md:text-xl tracking-wide"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2 + index * 0.1,
                            }}
                        >
                            {item.title}
                        </motion.span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default AboutSection;
