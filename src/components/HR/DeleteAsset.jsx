import { FiTrash2 } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const DeleteAsset = ({ asset, refetch }) => {
    const { user } = useAuth;
    const axiosInstance = useAxios();
    const [loading] = useState(false);

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosInstance.delete(
                        `/assets/delete/${asset._id}?email=${user.email}`
                    );

                    if (response.status === 200) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The asset has been deleted.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Failed!",
                            text: "Asset could not be deleted.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while deleting.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="btn btn-sm btn-outline btn-error flex items-center gap-1"
        >
            <FiTrash2 />
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
};

export default DeleteAsset;
