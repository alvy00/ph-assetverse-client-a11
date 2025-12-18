import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";

const EmProfile = () => {
    const { user, profileUpdate } = useAuth();
    const axiosInstance = useAxios();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: user.name, dob: user.dob },
    });

    useEffect(() => {
        reset({ name: user.name, dob: user.dob });
    }, [reset, user]);

    const initials = user.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    const { data: affData = {} } = useQuery({
        queryKey: ["affiliations"],
        queryFn: async () => {
            const res = await axiosInstance(`/affdata?email=${user.email}`);
            return res.data;
        },
    });

    const uniqueAffiliations = [
        ...new Map(
            (affData.comsAffData || []).map((item) => [
                item.companyName.toLowerCase(),
                item,
            ])
        ).values(),
    ];

    const handleUpdate = async (data) => {
        try {
            await axiosInstance.patch("/profileupdate", {
                email: user.email,
                name: data.name,
                dob: data.dob,
            });

            await profileUpdate({ displayName: data.name });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <section className="min-h-screen p-4 md:p-8 bg-base-100">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-base-content">
                        My Profile
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        Update your personal information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card bg-base-200 shadow-md rounded-xl overflow-hidden">
                    <div className="card-body flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-2 overflow-hidden bg-gray-200 flex items-center justify-center text-gray-700 text-3xl font-bold">
                                    {initials}
                                </div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
                        >
                            <div>
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("name")}
                                />
                            </div>

                            <div>
                                <label className="label">Email</label>
                                <input
                                    value={user.email}
                                    disabled
                                    className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    {...register("dob")}
                                />
                            </div>

                            <div className="md:col-span-2 mt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full md:w-auto"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Affiliations */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-base-content">
                        Company Affiliations
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {uniqueAffiliations.map((aff, index) => (
                            <div
                                key={index}
                                className="card bg-base-200 shadow-sm"
                            >
                                <div className="card-body flex flex-row items-center gap-4">
                                    <img
                                        src={
                                            aff.companyLogo ||
                                            "https://i.ibb.co/default-avatar.png"
                                        }
                                        alt={aff.companyName}
                                        className="w-12 h-12 rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {aff.companyName}
                                        </h3>
                                        <span className="badge badge-success badge-sm">
                                            {aff.status || "active"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmProfile;
