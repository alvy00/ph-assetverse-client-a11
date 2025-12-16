import { FiUser, FiBox, FiCheckCircle, FiMail } from "react-icons/fi";

const steps = [
    {
        icon: <FiUser size={32} className="text-primary" />,
        title: "Register Your Company",
        description:
            "HR managers create their company account and onboard employees quickly.",
    },
    {
        icon: <FiBox size={32} className="text-primary" />,
        title: "Manage Assets",
        description:
            "Track laptops, chairs, and other assets from inventory to assignment.",
    },
    {
        icon: <FiCheckCircle size={32} className="text-primary" />,
        title: "Optimize Workflow",
        description:
            "Ensure accountability, transparency, and efficient asset management.",
    },
];

const faqs = [
    {
        question: "Can employees work in multiple companies?",
        answer: "Yes, AssetVerse allows employees to manage assets across multiple companies simultaneously.",
    },
    {
        question: "What types of assets can I track?",
        answer: "Any physical asset such as laptops, chairs, keyboards, or office equipment can be tracked.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes, every new company gets a default subscription package to get started.",
    },
];

const ExtraSection = () => {
    return (
        <section className="py-16 bg-base-100 px-6 md:px-16 rounded-lg">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    A simple 3-step process to get started with AssetVerse.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                    >
                        <div className="mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">
                            {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>

            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="p-4 bg-white rounded-lg shadow-sm group"
                        >
                            <summary className="font-semibold cursor-pointer">
                                {faq.question}
                            </summary>
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>

            <div className="text-center bg-primary/10 p-12 rounded-2xl">
                <FiMail size={40} className="mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                <p className="text-gray-700 mb-6">
                    Have questions or want a demo? Contact our team today!
                </p>
                <button className="btn btn-primary btn-lg">Contact Us</button>
            </div>
        </section>
    );
};

export default ExtraSection;
