import { FiBox, FiEye, FiBarChart2 } from "react-icons/fi";

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

    return (
        <section className="py-12 bg-base-200">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    AssetVerse helps companies streamline HR & asset management
                    with powerful tracking, transparency, and data-driven
                    insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl overflow-hidden shadow-lg group bg-white"
                    >
                        {/* Image */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />

                        {/* Icon */}
                        <div className="absolute top-4 left-4 bg-primary/30 p-3 rounded-full">
                            {item.icon}
                        </div>

                        {/* Title */}
                        <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg md:text-xl tracking-wide">
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;
