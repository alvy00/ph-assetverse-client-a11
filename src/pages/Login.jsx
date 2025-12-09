import { useForm } from "react-hook-form";
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input
                    type="email"
                    className="input"
                    placeholder="Your email"
                    {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                    <p className="text-red-500">Email is required</p>
                )}

                <label className="label">Password</label>
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
    );
};

export default Login;
