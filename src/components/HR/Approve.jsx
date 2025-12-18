import React from "react";
import { FiCheck } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Approve = ({ reqId, requesterEmail, refetch }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [loading, setLoading] = React.useState(false);

    const handleApprove = async () => {
        //console.log(reqId, requesterEmail, user.email);
        try {
            setLoading(true);
            await axiosInstance.patch(
                `/request/updatestatus?hrEmail=${user.email}`,
                {
                    reqId,
                    requesterEmail,
                    requestStatus: "approved",
                }
            );
            toast.success("The request was approved!");
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
