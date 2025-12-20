/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { User } from "lucide-react";

const AssignAsset = ({ assets = [], employee, refetch }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [open, setOpen] = useState(false);

    const handleAssign = async (asset) => {
        const result = await Swal.fire({
            title: `Do you want to assign this asset?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });

        if (!result.isConfirmed) return;

        setOpen(false);

        Swal.fire({
            title: "Assigning...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
            customClass: {
                container: "z-[9999]",
            },
        });

        try {
            const response = await axiosInstance.post(
                `/assign?email=${user.email}`,
                {
                    assetId: asset._id,
                    employeeEmail: employee.email,
                    employeeName: employee.name,
                    companyName: user.companyName,
                }
            );

            Swal.fire({
                title: "Assigned!",
                text: response.data.message,
                icon: "success",
            });

            refetch();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while assigning.",
                icon: "error",
            });
        }
    };

    return (
        <>
            {/* Open Modal Button */}
            <button
                onClick={() => setOpen(true)}
                className="btn btn-sm btn-outline btn-primary"
            >
                Assign Asset
            </button>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl max-w-3xl w-full p-6 space-y-4 relative shadow-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* Header */}
                            <div className="flex flex-col items-center mb-4">
                                <p className="text-sm text-gray-500 mt-0.5">
                                    Assigning to{" "}
                                    <span className="font-medium text-base-content">
                                        {employee?.name || "—"}
                                    </span>
                                </p>
                                <h3 className="text-lg font-semibold mt-2">
                                    Available Assets
                                </h3>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto max-h-80">
                                <table className="table table-zebra w-full text-center">
                                    <thead className="bg-base-200 sticky top-0">
                                        <tr>
                                            <th>Asset Name</th>
                                            <th>Type</th>
                                            <th>Available</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assets.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="py-6 text-gray-500"
                                                >
                                                    No assets available
                                                </td>
                                            </tr>
                                        ) : (
                                            assets.map((asset) => (
                                                <tr key={asset._id}>
                                                    <td className="font-medium">
                                                        {asset.productName}
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-outline">
                                                            {asset.productType.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge ${
                                                                asset.availableQuantity >
                                                                0
                                                                    ? "badge-success"
                                                                    : "badge-error"
                                                            }`}
                                                        >
                                                            {
                                                                asset.availableQuantity
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="px-6 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                                                            disabled={
                                                                asset.availableQuantity <=
                                                                0
                                                            }
                                                            onClick={() =>
                                                                handleAssign(
                                                                    asset
                                                                )
                                                            }
                                                        >
                                                            Assign
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-6 py-2 rounded-full border-2 border-gray-500 text-black font-semibold hover:bg-gray-500 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AssignAsset;
