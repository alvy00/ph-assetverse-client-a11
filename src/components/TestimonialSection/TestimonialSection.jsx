import { FiUsers, FiBox, FiCheckCircle } from "react-icons/fi";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
    {
        quote: "AssetVerse has revolutionized how we manage our assets. It's super intuitive!",
        name: "Alice Johnson",
        role: "HR Manager, TechCorp",
        Icon: <FiUsers size={32} className="text-primary" />,
    },
    {
        quote: "Tracking laptops, chairs, and other assets has never been easier. Highly recommend!",
        name: "Bob Smith",
        role: "Operations Lead, Innovate Inc.",
        Icon: <FiUsers size={32} className="text-primary" />,
    },
];

const stats = [
    {
        icon: <FiCheckCircle size={36} className="text-primary" />,
        value: "150+",
        label: "Companies Trust Us",
    },
    {
        icon: <FiBox size={36} className="text-primary" />,
        value: "10,000+",
        label: "Assets Managed",
    },
    {
        icon: <FiUsers size={36} className="text-primary" />,
        value: "500+",
        label: "Employees Onboarded",
    },
];

const TestimonialSection = () => {
    return (
        <section className="py-16 bg-base-200 rounded-lg">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Why Companies Love AssetVerse
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Trusted by businesses worldwide to streamline asset &
                    employee management.
                </p>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 mb-12">
                {testimonials.map((t, index) => (
                    <TestimonialCard
                        key={index}
                        quote={t.quote}
                        name={t.name}
                        role={t.role}
                        Icon={t.Icon}
                    />
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center px-6 md:px-12">
                {stats.map((s, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="mb-4">{s.icon}</div>
                        <h3 className="text-3xl font-bold">{s.value}</h3>
                        <p className="text-gray-600">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
