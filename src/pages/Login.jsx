/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router";
import useAxios from "../hooks/useAxios";

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const { login, setUser, setFirebaseUser } = useAuth();
    const axiosInstance = useAxios();

    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await login(data.email, data.password);
            const token = await result.user.getIdToken(true);
            //console.log(result.user.uid, token);
            const { data: user } = await axiosInstance(
                `/users/${result.user.uid}`
            );

            setUser(user);
            setFirebaseUser(result.user);

            //console.log(user, result.user);

            toast.success("Logged in successfully!");
            navigate(location.pathname || "/");
        } catch (error) {
            console.log(error);

            if (error.code?.startsWith("auth/")) {
                toast.error("Invalid email or password");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            reset();
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="card">
                <div className="card-body">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold">Welcome Back</h2>
                        <p className="text-sm text-gray-500">
                            Login to continue to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className={`input input-bordered w-full ${
                                    errors.email ? "input-error" : ""
                                }`}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <p className="text-error text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`input input-bordered w-full ${
                                    errors.password ? "input-error" : ""
                                }`}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {errors.password && (
                                <p className="text-error text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-neutral w-full"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-4 text-sm">
                        <p>
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="link link-primary font-medium"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
