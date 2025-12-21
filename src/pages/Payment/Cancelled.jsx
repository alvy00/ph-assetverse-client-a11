import React from "react";
import { useNavigate } from "react-router";

const Cancelled = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Cancelled
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. You can try again or choose
                    a different package.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/dashboard/upgrade")}
                    className="btn w-full rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base transition cursor-pointer"
                >
                    View Packages
                </button>
            </div>
        </div>
    );
};

export default Cancelled;
