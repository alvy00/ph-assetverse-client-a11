import { Link } from "react-router";
import notFound from "../assets/notFound.png";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <img
                src={notFound}
                alt="Page not found"
                className="w-64 md:w-96 mb-8 animate-fadeIn"
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                Sorry, we couldn't find that page.
            </h2>
            <p className="text-gray-500 mb-6">
                It might have been moved, deleted, or you typed the wrong URL.
            </p>
            <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
