/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const EmployeeRegister = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { registerEmployee, profileUpdate, setUser, loading, setLoading } =
        useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let user;

        const { name, email, password, date, photo } = data;
        const imageFile = photo?.[0];

        const employee = {
            name,
            email,
            dob: date,
            role: "employee",
        };

        try {
            setLoading(true);

            const result = await registerEmployee(email, password);
            user = result.user;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const upload = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_IMAGEHOST
                    }`,
                    formData
                );

                // Appending the IMG url later to match in the db :)
                employee.profileImg =
                    upload.data.data.url ||
                    "https://i.ibb.co/default-avatar.png";
            }

            // Appending the UID later to match in the db
            employee.uid = result.user.uid;

            await axiosInstance.post("/register", employee);
            await profileUpdate({ displayName: name });

            toast.success("Employee registration successful!");
            navigate("/");
        } catch (error) {
            if (user) await user.delete();
            toast.error("Employee registration failed!");
        } finally {
            setLoading(false);
            setUser(employee);
            reset();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
        >
            <div className="text-center mb-2">
                <h2 className="text-xl font-semibold">
                    Create Employee Account
                </h2>
                <p className="text-sm text-base-content/70">
                    Fill in your details to get started
                </p>
            </div>

            {/* Name */}
            <div>
                <label className="label">Full Name</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="label">Email Address</label>
                <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    {...register("email", { required: "Email is required" })}
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
                    {...register("date", {
                        required: "Date of birth is required",
                    })}
                />
                {errors.date && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.date.message}
                    </p>
                )}
            </div>

            {/* Profile Image */}
            <div>
                <label className="label">Profile Image (Optional)</label>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    {...register("photo")}
                />
                <p className="text-xs text-base-content/60 mt-1">
                    JPG, PNG up to 2MB
                </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-base-content/70">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/auth/login")}
                    className="text-primary cursor-pointer hover:underline"
                >
                    Login
                </span>
            </p>
        </form>
    );
};

export default EmployeeRegister;
