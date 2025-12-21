import React from "react";
import { FiCheck } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Approve = ({
    reqId,
    assetId,
    requesterEmail,
    companyName,
    requesterName,
    refetch,
}) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [loading, setLoading] = React.useState(false);

    const handleApprove = async () => {
        try {
            setLoading(true);

            if (Number(user.currentEmployees) >= Number(user.packageLimit)) {
                return toast.error(
                    "Employees limit reached. Please upgrade your package"
                );
            }

            try {
                const resAssign = await axiosInstance.post(
                    `/assign?email=${user.email}`,
                    {
                        assetId: assetId,
                        employeeEmail: requesterEmail,
                        employeeName: requesterName,
                        companyName,
                    }
                );

                await axiosInstance.patch(
                    `/request/updatestatus?hrEmail=${user.email}`,
                    {
                        reqId,
                        requesterEmail,
                        requestStatus: "approved",
                    }
                );
                toast.success(
                    resAssign.data?.message ||
                        "Request approved and asset assigned!"
                );
            } catch (err) {
                if (err.response?.status === 409) {
                    toast.error(
                        err.response.data?.message ||
                            "Asset could not be assigned"
                    );
                } else {
                    throw err;
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to approve request"
            );
        } finally {
            setLoading(false);
            refetch();
        }
    };

    return (
        <button
            onClick={handleApprove}
            disabled={loading}
            className="btn btn-sm btn-success flex items-center gap-1"
        >
            {loading ? (
                "Approving..."
            ) : (
                <>
                    <FiCheck /> Approve
                </>
            )}
        </button>
    );
};

export default Approve;
