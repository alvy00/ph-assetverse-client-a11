import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="mx-auto max-w-4xl text-center mb-14">
                <h1 className="text-4xl font-bold text-gray-900">
                    Get in Touch
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Have a question, feedback, or business inquiry? Our team is
                    ready to help.
                </p>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Contact Information */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Contact Information
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Reach out through any of the following channels.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <FiMail className="mt-1 text-xl text-indigo-600" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    Email
                                </p>
                                <p className="text-gray-600">
                                    support@yourapp.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FiPhone className="mt-1 text-xl text-indigo-600" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    Phone
                                </p>
                                <p className="text-gray-600">
                                    +880 1234 567 890
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FiMapPin className="mt-1 text-xl text-indigo-600" />
                            <div>
                                <p className="font-medium text-gray-900">
                                    Office
                                </p>
                                <p className="text-gray-600">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">
                        We usually respond within 24 hours on business days.
                    </p>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-white rounded-2xl border shadow-sm p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Send a Message
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Tell us how we can help..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
