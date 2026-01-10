/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { user, login, setUser, setFirebaseUser } = useAuth();
    const axiosInstance = useAxios();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

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

            // console.log(location.pathname);

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

    const demoLoginEM = () => {
        reset({
            email: "em1@gmail.com",
            password: "4363456A",
        });
    };

    const demoLoginHR = () => {
        reset({
            email: "hr1@gmail.com",
            password: "4363456A",
        });
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

                        {/* Login Section */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-neutral w-full"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <div className="mt-6 rounded-lg border bg-gray-50 p-4">
                            <p className="text-sm font-medium text-gray-700 mb-3">
                                Demo Login
                            </p>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={demoLoginEM}
                                    className="flex-1 cursor-pointer rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
                                >
                                    Employee
                                </button>

                                <button
                                    type="button"
                                    onClick={demoLoginHR}
                                    className="flex-1 cursor-pointer rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
                                >
                                    HR
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                Instantly explore the app without creating an
                                account.
                            </p>
                        </div>
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
