/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const Payment = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const { name } = useParams();

    const {
        data: packages = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosInstance("/packages");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (isError)
        return <p className="text-red-500 text-center">{error.message}</p>;

    const pack = packages.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (!pack)
        return <p className="text-center text-gray-500">Package not found</p>;

    const handlePayment = async () => {
        try {
            const res = await axiosInstance.post(
                `/payment-checkout-session?email=${user.email}`,
                { name: pack.name, price: pack.price }
            );
            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
            alert("Error initiating payment. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {pack.name} Package
                    </h1>
                    <span className="text-3xl font-extrabold text-gray-900">
                        ${pack.price}
                        <span className="text-sm font-normal text-gray-500">
                            /mo
                        </span>
                    </span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-6">
                    {pack.features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                        >
                            <CheckIcon />
                            <span>{feature}</span>
                        </li>
                    ))}
                    <li className="flex items-start gap-2 font-medium text-gray-800">
                        <CheckIcon />
                        <span>Employee Limit: {pack.employeeLimit}</span>
                    </li>
                </ul>

                {/* Payment Button */}
                <button
                    onClick={handlePayment}
                    className="btn w-full rounded-xl bg-primary text-white hover:bg-primary-dark text-lg transition"
                >
                    Pay ${pack.price} & Subscribe
                </button>

                {/* Optional Note */}
                <p className="text-sm text-gray-500 mt-4 text-center">
                    By subscribing, you agree to our terms and conditions.
                </p>
            </div>
        </div>
    );
};

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mt-0.5 text-primary flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
        />
    </svg>
);

export default Payment;
