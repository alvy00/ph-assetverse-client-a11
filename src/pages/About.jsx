import { FiTarget, FiUsers, FiTrendingUp } from "react-icons/fi";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-10">
            {/* Hero Section */}
            <div className="mx-auto max-w-4xl text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
                <p className="mt-4 text-lg text-gray-600">
                    We build reliable, user-focused digital products that help
                    people work smarter and move faster.
                </p>
            </div>

            {/* Story Section */}
            <div className="mx-auto max-w-5xl mb-20">
                <div className="bg-white border rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Our Story
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our journey started with a simple idea: create products
                        that are easy to use, fast, and genuinely helpful. We
                        believe great software should feel intuitive from the
                        first interaction.
                    </p>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Today, we focus on building scalable solutions with
                        modern technologies while keeping the user experience at
                        the center of everything we do.
                    </p>
                </div>
            </div>

            {/* Values Section */}
            <div className="mx-auto max-w-6xl mb-20">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
                    What Drives Us
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <FiTarget className="text-3xl text-indigo-600 mb-4" />
                        <h3 className="font-semibold text-lg text-gray-900">
                            Purpose-Driven
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            Every feature we build solves a real problem and
                            delivers meaningful value.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <FiUsers className="text-3xl text-indigo-600 mb-4" />
                        <h3 className="font-semibold text-lg text-gray-900">
                            User First
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            We design with empathy, focusing on clarity,
                            accessibility, and ease of use.
                        </p>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <FiTrendingUp className="text-3xl text-indigo-600 mb-4" />
                        <h3 className="font-semibold text-lg text-gray-900">
                            Continuous Growth
                        </h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            We constantly improve our products, processes, and
                            skills to stay ahead.
                        </p>
                    </div>
                </div>
            </div>

            {/* Closing Section */}
            <div className="mx-auto max-w-4xl text-center">
                <p className="text-gray-600 text-lg">
                    We’re committed to building products that people trust and
                    enjoy using — today and in the future.
                </p>
            </div>
        </div>
    );
};

export default About;
