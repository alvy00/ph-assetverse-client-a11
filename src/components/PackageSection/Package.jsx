const Package = ({ name, emLimit, price, features, popular }) => {
    return (
        <div
            className={`mx-auto relative w-100 rounded-2xl border bg-white shadow-sm p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${
                    popular
                        ? "border-primary shadow-md scale-[1.03]"
                        : "border-gray-200"
                }
            `}
        >
            {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-medium shadow-md">
                    ⭐ Most Popular
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{name}</h2>
                <span className="text-3xl font-bold">
                    ${price}
                    <span className="text-sm font-normal text-gray-500">
                        /mo
                    </span>
                </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-4"></div>

            {/* Features */}
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex gap-2 items-center text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 text-primary"
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

                <li className="flex gap-2 items-center text-sm font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-primary"
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
                    Employee Limit: {emLimit}
                </li>
            </ul>

            {/* Button */}
            <button
                className={`btn mt-6 w-full rounded-xl text-white ${
                    popular ? "btn-primary" : "bg-gray-800 hover:bg-gray-900"
                }`}
            >
                Subscribe
            </button>
        </div>
    );
};

export default Package;
