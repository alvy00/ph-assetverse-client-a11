/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import Package from "./Package";
import { motion } from "framer-motion";

const PackageSection = () => {
    const {
        data: packages = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await fetch("/packages.json");
            if (!res.ok) {
                throw new Error("Failed to load packages");
            }
            return res.json();
        },
    });

    const containerVariants = {
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
        <section className="py-12 sm:py-16 lg:py-20 bg-base-200 w-full rounded-lg">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 px-4">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Our Packages
                </motion.h2>
                <motion.p
                    className="text-gray-600 mt-3 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Choose the package that fits your company's needs and scale
                    with AssetVerse.
                </motion.p>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Loading */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="skeleton h-72 w-full max-w-sm rounded-xl"
                            />
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="text-center text-red-500 font-medium">
                        {error.message}
                    </div>
                )}

                {/* Packages */}
                {!isLoading && !isError && (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 place-items-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {packages.map((pack, index) => (
                            <motion.div
                                key={pack.name}
                                variants={cardVariants}
                                whileHover="hover"
                                className="w-full"
                            >
                                <Package
                                    name={pack.name}
                                    emLimit={pack.employeeLimit}
                                    price={pack.price}
                                    features={pack.features}
                                    popular={pack.popular}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PackageSection;
