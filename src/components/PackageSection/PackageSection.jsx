import Package from "./Package";

const packages = [
    {
        name: "Basic",
        employeeLimit: 5,
        price: 5,
        features: ["Asset Tracking", "Employee Management", "Basic Support"],
        popular: false,
    },
    {
        name: "Standard",
        employeeLimit: 10,
        price: 8,
        features: [
            "All Basic features",
            "Advanced Analytics",
            "Priority Support",
        ],
        popular: true,
    },
    {
        name: "Premium",
        employeeLimit: 20,
        price: 15,
        features: ["All Standard features", "Custom Branding", "24/7 Support"],
        popular: false,
    },
];

const PackageSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-full gap-7 md:gap-0">
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
    );
};

export default PackageSection;
