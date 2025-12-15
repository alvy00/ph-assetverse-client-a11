import { useState } from "react";

const EmProfile = () => {
    // mock logged-in user
    const [employee, setEmployee] = useState({
        name: "Aisha Rahman",
        email: "aisha.rahman@gmail.com",
        dateOfBirth: "1999-06-12",
        profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    });

    // mock affiliations
    const affiliations = [
        {
            companyName: "Test Company Ltd",
            companyLogo: "https://i.ibb.co/company1.png",
            status: "active",
        },
        {
            companyName: "Another Corp",
            companyLogo: "https://i.ibb.co/company2.png",
            status: "active",
        },
    ];

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setEmployee({ ...employee, profileImage: previewURL });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated profile:", employee);
        // later → PATCH /users/profile
    };

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">My Profile</h1>
                    <p className="text-base-content/70">
                        Update your personal information
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
                                            src={employee.profileImage}
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
                                        value={employee.name}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        value={employee.email}
                                        disabled
                                        className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={employee.dateOfBirth}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
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

                {/* Affiliations */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Company Affiliations
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {affiliations.map((aff, index) => (
                            <div
                                key={index}
                                className="card bg-base-200 shadow-sm"
                            >
                                <div className="card-body flex flex-row items-center gap-4">
                                    <img
                                        src={aff.companyLogo}
                                        alt={aff.companyName}
                                        className="w-12 h-12 rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                            {aff.companyName}
                                        </h3>
                                        <span className="badge badge-success badge-sm">
                                            {aff.status}
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
