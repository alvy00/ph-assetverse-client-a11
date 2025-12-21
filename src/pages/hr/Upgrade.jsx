import { useQuery } from "@tanstack/react-query";
import PackageSection from "../../components/PackageSection/PackageSection";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";

const Upgrade = () => {
    const axiosInstance = useAxios();
    const { user } = useAuth();

    const {
        data: payments = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosInstance(`/payments?email=${user.email}`);
            return res.data.payments;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Package Subscription Section */}
            <section>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                    Upgrade Your Plan
                </h1>
                <PackageSection />
            </section>

            {/* Payments History Section */}
            <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Payment History
                </h2>

                {isLoading && <p>Loading payment history...</p>}
                {isError && (
                    <p className="text-red-500">Failed to load payments</p>
                )}

                {!isLoading && payments.length === 0 && (
                    <p className="text-gray-500">No payments found.</p>
                )}

                {!isLoading && payments.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        Package
                                    </th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        Amount ($)
                                    </th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        New Employee Limit
                                    </th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        Transaction ID
                                    </th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        Payment Date
                                    </th>
                                    <th className="text-left px-6 py-3 text-gray-600 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr
                                        key={p.transactionId}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {p.packageName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {p.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {p.employeeLimit}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm">
                                            {p.transactionId}
                                        </td>
                                        <td className="px-6 py-4">
                                            {format(
                                                new Date(p.paymentDate),
                                                "PPPpp"
                                            )}
                                        </td>
                                        <td
                                            className={`px-6 py-4 font-semibold ${
                                                p.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {p.status.charAt(0).toUpperCase() +
                                                p.status.slice(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Upgrade;
