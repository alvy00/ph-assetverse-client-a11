const Package = ({ name, emLimit, price, features, popular }) => {
    return (
        <div
            className={`
                relative
                w-full
                max-w-sm
                sm:max-w-md
                mx-auto
                rounded-2xl
                border
                bg-white
                p-4
                sm:p-6
                shadow-sm
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
                ${
                    popular
                        ? "border-primary shadow-md sm:scale-[1.03]"
                        : "border-gray-200"
                }
            `}
        >
            {/* Popular Badge */}
            {popular && (
                <div
                    className="
                    absolute
                    -top-3
                    left-1/2
                    -translate-x-1/2
                    px-3
                    py-1
                    sm:px-4
                    rounded-full
                    bg-primary
                    text-white
                    text-[10px]
                    sm:text-xs
                    font-medium
                    shadow-md
                    whitespace-nowrap
                "
                >
                    ⭐ Most Popular
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between gap-2 sm:justify-between sm:items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
                    {name}
                </h2>

                <span className="text-2xl sm:text-3xl font-bold text-center sm:text-right">
                    ${price}
                    <span className="text-xs sm:text-sm font-normal text-gray-500">
                        /mo
                    </span>
                </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-4" />

            {/* Features */}
            <ul className="space-y-2 sm:space-y-3">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex gap-2 items-start text-xs sm:text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 shrink-0 text-primary mt-0.5"
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
                        <span>{feature}</span>
                    </li>
                ))}

                <li className="flex gap-2 items-start text-xs sm:text-sm font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 shrink-0 text-primary mt-0.5"
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
                    <span>Employee Limit: {emLimit}</span>
                </li>
            </ul>

            {/* Button */}
            <button
                className={`
                    btn
                    mt-6
                    w-full
                    rounded-xl
                    text-sm
                    sm:text-base
                    ${
                        popular
                            ? "btn-primary"
                            : "bg-gray-800 hover:bg-gray-900 text-white"
                    }
                `}
            >
                Subscribe
            </button>
        </div>
    );
};

export default Package;
