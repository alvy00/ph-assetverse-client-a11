import { useQuery } from "@tanstack/react-query";
import Package from "./Package";

const PackageSection = () => {
    const { data: packages = [] } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const data = await fetch("/packages.json");
            return data.json();
        },
    });

    return (
        <section className="py-12 bg-base-200 mx-auto w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">Our Packages</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Choose the package that fits your company's needs and scale
                    with AssetVerse.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
                {packages?.map((pack) => (
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
        </section>
    );
};

export default PackageSection;
