import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
const HRRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { registerHr, setUser } = useAuth();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        registerHr(email, password)
            .then((result) => {
                setUser(result.user);
                navigate("/");
                console.log(result.user);
            })
            .catch((error) => console.error(error));
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register as HR</legend>

                <label className="label">Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <p className="text-red-500">Name cannot be empty</p>
                )}

                <label className="label">Company Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Company Name"
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <p className="text-red-500">Company name cannot be empty</p>
                )}

                <label className="label">Company Logo</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Logo URL"
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <p className="text-red-500">A logo url is required</p>
                )}

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
                        minLength: {
                            value: 6,
                            message: "Password must be 6 characters or longer",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z]).+$/,
                            message:
                                "Password must contain at least one capital letter",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <label className="label">Date of Birth</label>
                <input
                    type="date"
                    className="input"
                    {...register("date", { required: true })}
                />
                {errors.date?.type === "required" && (
                    <p className="text-red-500">
                        A valid date of birth is required
                    </p>
                )}

                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </form>
    );
};

export default HRRegister;
