import { useState } from "react";

const HrProfile = () => {
    // mock logged-in HR
    const [hr, setHr] = useState({
        name: "Nadia Khan",
        email: "hr@techhive.io",
        companyName: "TechHive",
        companyLogo: "https://i.ibb.co/company3.png",
        subscription: "business",
        packageLimit: 15,
        currentEmployees: 6,
        profileImage: "https://randomuser.me/api/portraits/women/30.jpg",
    });

    const handleChange = (e) => {
        setHr({ ...hr, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setHr({ ...hr, profileImage: previewURL });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated HR profile:", hr);
        // later → PATCH /hr/profile
    };

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">HR Profile</h1>
                    <p className="text-base-content/70">
                        Manage your account and company details
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card bg-base-200 shadow-md">
                    <div className="card-body">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col md:flex-row gap-8"
                        >
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="avatar">
                                    <div className="w-32 rounded-full ring ring-primary ring-offset-2">
                                        <img
                                            src={hr.profileImage}
                                            alt="Profile"
                                        />
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-sm file-input-bordered"
                                />
                            </div>

                            {/* Form Fields */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Name</label>
                                    <input
                                        name="name"
                                        value={hr.name}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        value={hr.email}
                                        disabled
                                        className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Subscription
                                    </label>
                                    <input
                                        value={hr.subscription}
                                        disabled
                                        className="input input-bordered w-full bg-base-200"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Employees Used
                                    </label>
                                    <input
                                        value={`${hr.currentEmployees} / ${hr.packageLimit}`}
                                        disabled
                                        className="input input-bordered w-full bg-base-200"
                                    />
                                </div>

                                <div className="md:col-span-2 mt-4">
                                    <button className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Company Info */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Company Information
                    </h2>

                    <div className="card bg-base-200 shadow-sm">
                        <div className="card-body flex flex-row items-center gap-4">
                            <img
                                src={hr.companyLogo}
                                alt={hr.companyName}
                                className="w-14 h-14 rounded"
                            />
                            <div>
                                <h3 className="font-medium text-lg">
                                    {hr.companyName}
                                </h3>
                                <span className="badge badge-primary badge-outline">
                                    {hr.subscription} plan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HrProfile;
