import { FiBox, FiEye, FiBarChart2 } from "react-icons/fi";

import efficient_asset from "../../assets/efficient_asset.jpg";
import transparency from "../../assets/transparency.jpg";
import data_driven from "../../assets/data_driven.jpg";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden shadow-lg"
                >
                    {/* Image */}
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300" />

                    {/* Icon */}
                    <div className="absolute top-4 left-4">{item.icon}</div>

                    {/* Title */}
                    <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg tracking-wide">
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default AboutSection;
