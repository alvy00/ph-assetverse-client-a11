import { FiMail, FiHelpCircle, FiMessageSquare } from "react-icons/fi";

const faqs = [
    {
        q: "How do I reset my password?",
        a: "Go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
    },
    {
        q: "Why can't I access some features?",
        a: "Some features depend on your subscription plan or role. Check your plan details or contact support.",
    },
    {
        q: "How long does support take to respond?",
        a: "We usually respond within 24 hours on business days.",
    },
];

const Support = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Support Center
                </h1>
                <p className="mt-2 text-gray-600">
                    Need help? We’re here to assist you.
                </p>
            </div>

            {/* Quick Help Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                <div className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-md transition">
                    <FiHelpCircle className="text-3xl text-indigo-500 mb-3" />
                    <h3 className="font-semibold text-lg">Help Articles</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Browse common questions and solutions.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-md transition">
                    <FiMessageSquare className="text-3xl text-emerald-500 mb-3" />
                    <h3 className="font-semibold text-lg">Live Support</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Chat with our support team (coming soon).
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-md transition">
                    <FiMail className="text-3xl text-orange-500 mb-3" />
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Reach us directly for detailed issues.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mb-14">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <h4 className="font-medium text-gray-900">
                                {faq.q}
                            </h4>
                            <p className="mt-2 text-sm text-gray-600">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        rows="4"
                        placeholder="Describe your issue..."
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition"
                    >
                        Submit Ticket
                    </button>
                </form>

                <p className="mt-3 text-xs text-gray-500 text-center">
                    Our team will review your request as soon as possible.
                </p>
            </div>
        </div>
    );
};

export default Support;
