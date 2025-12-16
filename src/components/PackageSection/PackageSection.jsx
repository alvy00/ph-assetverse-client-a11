import { useQuery } from "@tanstack/react-query";
import Package from "./Package";

const PackageSection = () => {
    const {
        data: packages = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await fetch("/packages.json");
            if (!res.ok) {
                throw new Error("Failed to load packages");
            }
            return res.json();
        },
    });

    return (
        <section className=" py-12 sm:py-16 lg:py-20 bg-base-200 w-full">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Our Packages
                </h2>
                <p className="text-gray-600 mt-3 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
                    Choose the package that fits your company's needs and scale
                    with AssetVerse.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Loading */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="skeleton h-72 w-full max-w-sm rounded-xl"
                            />
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="text-center text-red-500 font-medium">
                        {error.message}
                    </div>
                )}

                {/* Packages */}
                {!isLoading && !isError && (
                    <div
                        className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                        sm:gap-8
                        place-items-center
                    "
                    >
                        {packages.map((pack) => (
                            <Package
                                key={pack.name}
                                name={pack.name}
                                emLimit={pack.employeeLimit}
                                price={pack.price}
                                features={pack.features}
                                popular={pack.popular}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PackageSection;
