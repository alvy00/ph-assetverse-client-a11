/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { format } from "date-fns";

const Success = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [searchParam] = useSearchParams();
    const session_id = searchParam.get("session_id");

    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            if (!session_id || !user?.email) return;

            try {
                setLoading(true);
                const res = await axiosInstance.patch(
                    `/payment-success?email=${user.email}&session_id=${session_id}`
                );

                setPayment(res.data.payment);
            } catch (err) {
                console.error("Error fetching payment:", err);
                setError("Unable to fetch payment details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [session_id, user?.email, axiosInstance]);

    if (loading) return <Loading />;
    if (error)
        return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
                {/* Hero Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 rounded-full p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-green-500"
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
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for subscribing to the{" "}
                    <strong>{payment.packageName}</strong> package.
                </p>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-medium text-gray-800 mb-3">
                        {payment.transactionId}
                    </p>

                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium text-gray-800 mb-3">
                        ${payment.amount}
                    </p>

                    <p className="text-sm text-gray-500">New Employee Limit</p>
                    <p className="font-medium text-green-800 mb-3">
                        {payment.employeeLimit}
                    </p>

                    <p className="text-sm text-gray-500">Subscription Email</p>
                    <p className="font-medium text-gray-800 mb-3">
                        {payment.hrEmail}
                    </p>

                    <p className="text-sm text-gray-500">Payment Date</p>
                    <p className="font-medium text-gray-800">
                        {format(new Date(payment.paymentDate), "PPPpp")}
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() =>
                        (window.location.href = "/dashboard/assetlist")
                    }
                    className="w-full bg-primary hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Success;
