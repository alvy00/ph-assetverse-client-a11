import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const Reject = ({ reqId, requesterEmail, refetch }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [loading, setLoading] = React.useState(false);

    const handleReject = async () => {
        //console.log(reqId, requesterEmail, user.email);
        try {
            setLoading(true);
            await axiosInstance.patch(
                `/request/updatestatus?hrEmail=${user.email}`,
                {
                    reqId,
                    requesterEmail,
                    requestStatus: "rejected",
                }
            );
            toast.success("The request was rejected!");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to reject request"
            );
        } finally {
            setLoading(false);
            refetch();
        }
    };

    return (
        <button
            onClick={handleReject}
            disabled={loading}
            className="btn btn-sm btn-error flex items-center gap-1"
        >
            {loading ? (
                "Rejecting..."
            ) : (
                <>
                    <FiX /> Reject
                </>
            )}
        </button>
    );
};

export default Reject;
