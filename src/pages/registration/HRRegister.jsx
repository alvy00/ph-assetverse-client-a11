import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
const HRRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { registerHR, profileUpdate, setUser, loading, setLoading } =
        useAuth();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const imageFile = data.photo[0];

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            setLoading(true);
            const result = await registerHR(email, password);
            setUser(result.user);

            const upload = await axios.post(
                `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_IMAGEHOST
                }`,
                formData
            );

            const userProfile = {
                displayName: data.name,
                photoURL: upload.data.data.url,
            };

            await profileUpdate(userProfile);
            //console.log(upload.data.data.url);
            console.log(result.user);
            toast.success("HR registration successful!");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
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
                    {...register("name", { required: "Name cannot be empty" })}
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}

                <label className="label">Company Name</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Company Name"
                    {...register("companyName", {
                        required: "Company name cannot be empty",
                    })}
                />
                {errors.companyName && (
                    <p className="text-red-500">{errors.companyName.message}</p>
                )}

                <label className="label">Email</label>
                <input
                    type="email"
                    className="input"
                    placeholder="Your email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
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
                    {...register("dateOfBirth", {
                        required: "A valid date of birth is required",
                    })}
                />
                {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                )}
                <label className="label">Company Logo</label>
                <input
                    type="file"
                    className="file-input"
                    placeholder="Logo URL"
                    {...register("photo", {
                        required: "A logo url is required",
                    })}
                />
                {errors.photo && (
                    <p className="text-red-500">{errors.photo.message}</p>
                )}
                <button className="btn btn-neutral mt-4">
                    {loading ? "Signing up..." : "Register"}
                </button>
            </fieldset>
        </form>
    );
};

export default HRRegister;
