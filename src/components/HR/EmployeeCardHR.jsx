import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import AssignAsset from "./AssignAsset";
import { useQuery } from "@tanstack/react-query";

const EmployeeCardHR = ({ employee, refetch }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const { name, email, profileImage, joinDate, assetsCount } = employee;

    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "U";

    const { data: avbAssets = [] } = useQuery({
        queryKey: ["avbAssets", employee],
        queryFn: async () => {
            const res = await axiosInstance(
                `/assignable?email=${user.email}&emailem=${email}`
            );
            return res.data;
        },
    });
    //console.log(avbAssets);

    const handleRemove = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Removing...",
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });
                try {
                    const response = await axiosInstance.delete(
                        `/emdelete?email=${
                            user.email
                        }&employeeEmail=${email}&companyName=${encodeURIComponent(
                            user.companyName
                        )}`
                    );

                    Swal.fire({
                        title: "Deleted!",
                        text: response.data.message,
                        icon: "success",
                    });
                    refetch();
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text:
                            error.response?.data?.message ||
                            "Something went wrong while removing.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="card bg-base-200 w-80 shadow-md hover:shadow-xl transition-all duration-300">
            {/* Avatar */}
            <figure className="pt-6">
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt={name}
                        className="w-24 h-24 rounded-full object-cover mx-auto ring ring-primary ring-offset-2"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 ring ring-primary ring-offset-2 flex items-center justify-center text-primary text-3xl font-bold mx-auto">
                        {initials}
                    </div>
                )}
            </figure>

            {/* Body */}
            <div className="card-body items-center text-center p-4 space-y-1">
                <h2 className="card-title text-lg">
                    {name || "Unnamed Employee"}
                </h2>

                <p className="text-sm text-gray-500 break-all">{email}</p>

                <p className="text-sm text-gray-500">
                    Joined:{" "}
                    <span className="font-medium">
                        {joinDate
                            ? new Date(joinDate).toLocaleDateString()
                            : "N/A"}
                    </span>
                </p>

                {/* Assets */}
                <div className="badge badge-outline badge-info mt-2 px-4 py-3">
                    Assets: {assetsCount ?? 0}
                </div>

                {/* Actions */}
                <div className="card-actions mt-4 gap-2">
                    <AssignAsset
                        assets={avbAssets}
                        employee={employee}
                        refetch={refetch}
                    />
                    <button
                        onClick={handleRemove}
                        className="btn btn-sm btn-outline btn-error"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCardHR;
