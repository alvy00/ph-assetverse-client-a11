import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";

const HRRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user, registerHR, profileUpdate, setUser, loading, setLoading } =
        useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        let user;

        const { name, email, password, companyName, photo } = data;

        const imageFile = photo?.[0];

        const hr = {
            name,
            email,
            role: "hr",
            companyName,
            packageLimit: 5,
            currentEmployees: 0,
            subscription: "basic",
        };

        try {
            setLoading(true);

            const result = await registerHR(email, password);
            user = result.user;

            let logoUrl = "";

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const upload = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_IMAGEHOST
                    }`,
                    formData
                );

                logoUrl = upload.data.data.url;
                hr.companyLogo = logoUrl;
            }

            // setting the UID
            hr.uid = result.user.uid;
            await profileUpdate({
                displayName: name,
                photoURL: logoUrl,
            });

            await axiosInstance.post("/register", hr);
            toast.success("HR registration successful!");
            console.log(hr);
            navigate("/");
        } catch (error) {
            if (user) await user.delete();
            console.error(error);
            toast.error("Registration failed. Try again.");
        } finally {
            setLoading(false);
            setUser(hr);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
        >
            {/* Header */}
            <div className="text-center mb-2">
                <h2 className="text-xl font-semibold">Create HR Account</h2>
                <p className="text-sm text-base-content/70">
                    Register your company to manage assets
                </p>
            </div>

            {/* Name */}
            <div>
                <label className="label">Full Name</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Jane Smith"
                    {...register("name", {
                        required: "Name cannot be empty",
                    })}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Company Name */}
            <div>
                <label className="label">Company Name</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Acme Corporation"
                    {...register("companyName", {
                        required: "Company name cannot be empty",
                    })}
                />
                {errors.companyName && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.companyName.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="label">Email Address</label>
                <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="hr@company.com"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="label">Password</label>
                <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z]).+$/,
                            message: "Must contain at least one capital letter",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Date of Birth */}
            <div>
                <label className="label">Date of Birth</label>
                <input
                    type="date"
                    className="input input-bordered w-full"
                    {...register("dateOfBirth", {
                        required: "A valid date of birth is required",
                    })}
                />
                {errors.dateOfBirth && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.dateOfBirth.message}
                    </p>
                )}
            </div>

            {/* Company Logo */}
            <div>
                <label className="label">Company Logo</label>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    {...register("photo", {
                        required: "Company logo is required",
                    })}
                />
                {errors.photo && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.photo.message}
                    </p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-base-content/70">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-primary cursor-pointer hover:underline"
                >
                    Login
                </span>
            </p>
        </form>
    );
};

export default HRRegister;
