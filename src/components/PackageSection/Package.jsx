/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Package = ({ name, emLimit, price, features, popular }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const currentPlan = user?.subscription?.toLowerCase();
    const planName = name?.toLowerCase();
    const isSubscribed = currentPlan === planName;

    const handleSubscribe = () => {
        if (!user || user.role !== "hr") {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Register as an HR to subscribe to our packages",
            });
        }

        if (user.currentEmployees >= emLimit) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You’ve reached the employee limit for this package. Please select a higher-tier package to add more employees.",
            });
        }

        navigate(`/payment/${name}`);
    };

    const getButtonClass = () => {
        if (isSubscribed)
            return "btn-disabled bg-gray-300 text-gray-600 cursor-not-allowed";
        if (popular) return "btn-primary";
        return "bg-gray-800 hover:bg-gray-900 text-white";
    };

    return (
        <div
            className={`relative w-full max-w-sm sm:max-w-md mx-auto rounded-2xl border bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                popular
                    ? "border-primary shadow-md sm:scale-[1.03]"
                    : "border-gray-200"
            }`}
        >
            {popular && <PopularBadge />}

            <Header name={name} price={price} />

            <Divider />

            <Features features={features} emLimit={emLimit} />

            <SubscribeButton
                onClick={handleSubscribe}
                isSubscribed={isSubscribed}
                buttonClass={getButtonClass()}
            />
        </div>
    );
};

const PopularBadge = () => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-medium shadow-md whitespace-nowrap">
        ⭐ Most Popular
    </div>
);

const Header = ({ name, price }) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
        <span className="text-2xl sm:text-3xl font-bold">
            ${price}
            <span className="text-xs sm:text-sm font-normal text-gray-500">
                /mo
            </span>
        </span>
    </div>
);

const Divider = () => <div className="w-full h-px bg-gray-200 mb-4" />;

const Features = ({ features, emLimit }) => (
    <ul className="space-y-2 sm:space-y-3">
        {features.map((feature, index) => (
            <li
                key={index}
                className="flex gap-2 items-start text-xs sm:text-sm"
            >
                <CheckIcon />
                <span>{feature}</span>
            </li>
        ))}
        <li className="flex gap-2 items-start text-xs sm:text-sm font-medium">
            <CheckIcon />
            <span>Employee Limit: {emLimit}</span>
        </li>
    </ul>
);

const SubscribeButton = ({ onClick, isSubscribed, buttonClass }) => (
    <button
        onClick={onClick}
        disabled={isSubscribed}
        className={`btn mt-6 w-full rounded-xl text-sm sm:text-base transition ${buttonClass}`}
    >
        {isSubscribed ? "Current Plan" : "Subscribe"}
    </button>
);

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0 text-primary mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
        />
    </svg>
);

export default Package;
