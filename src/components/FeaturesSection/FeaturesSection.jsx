/* eslint-disable no-unused-vars */
import {
    FaUsers,
    FaClipboardList,
    FaRegFileAlt,
    FaBoxes,
    FaExchangeAlt,
    FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
    {
        icon: <FaUsers />,
        title: "HR Managers & Company Registration",
        description:
            "HR managers can register their company and onboard employees easily.",
    },
    {
        icon: <FaClipboardList />,
        title: "Default Subscription Package",
        description: "Get started with a default package for 5 employees.",
    },
    {
        icon: <FaRegFileAlt />,
        title: "Employee Registration & Requests",
        description:
            "Employees register independently and request assets seamlessly.",
    },
    {
        icon: <FaBoxes />,
        title: "Asset Tracking & Inventory",
        description: "Track all company assets from inventory to assignment.",
    },
    {
        icon: <FaExchangeAlt />,
        title: "Asset Assignment Workflow",
        description: "Assign assets to employees efficiently and track usage.",
    },
    {
        icon: <FaBuilding />,
        title: "Multi-Company Employee Management",
        description:
            "Employees can work across multiple companies and manage assets.",
    },
];

const FeaturesSection = () => {
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
        <section className="py-12 bg-base-200 rounded-lg">
            <div className="text-center mb-10">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Our Features
                </motion.h2>
                <motion.p
                    className="text-gray-600 mt-2 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    AssetVerse provides a suite of tools to streamline HR &
                    asset management for your company.
                </motion.p>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                {features.map((f, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center p-6 rounded-2xl shadow-md bg-white cursor-pointer"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary/20 text-primary text-3xl">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {f.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{f.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
