import { useState } from "react";

const EmployeeCardHR = ({ employee, onRemove }) => {
    const { name, email, profileImage, joinDate, assetsCount } = employee;

    const [confirming, setConfirming] = useState(false);

    const handleRemove = () => {
        if (!confirming) {
            setConfirming(true);
            return;
        }

        onRemove(employee);
        setConfirming(false);
    };

    return (
        <div className="card bg-base-200 w-80 shadow-md hover:shadow-lg transition">
            {/* Profile Image */}
            <figure className="px-6 pt-6">
                <img
                    src={profileImage}
                    alt={name}
                    className="rounded-full w-24 h-24 object-cover mx-auto"
                />
            </figure>

            {/* Card Body */}
            <div className="card-body items-center text-center p-4 space-y-1">
                {/* Name */}
                <h2 className="card-title text-lg">{name}</h2>

                {/* Email */}
                <p className="text-sm text-gray-500 break-all">{email}</p>

                {/* Join Date */}
                <p className="text-sm text-gray-500">
                    Joined:{" "}
                    <span className="font-medium">
                        {new Date(joinDate).toLocaleDateString()}
                    </span>
                </p>

                {/* Assets Count */}
                <div className="badge badge-outline badge-info mt-2">
                    Assets: {assetsCount || "---"}
                </div>

                {/* Actions */}
                <div className="card-actions mt-4">
                    <button
                        onClick={handleRemove}
                        className={`btn btn-sm ${
                            confirming ? "btn-error" : "btn-outline btn-error"
                        }`}
                    >
                        {confirming ? "Confirm Remove" : "Remove from Team"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCardHR;
