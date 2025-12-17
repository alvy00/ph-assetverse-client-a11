import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const AddAsset = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            type: "",
            quantity: "",
            photo: null,
        },
    });

    const handleAdd = async (data) => {
        const { name, type, quantity } = data;
        const imageFile = data.photo[0];

        const asset = {
            productName: name,
            productType: type,
            productQuantity: quantity,
            availableQuantity: quantity,
            hrEmail: user.email,
            companyName: user.companyName,
        };

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const upload = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_IMAGEHOST
                    }`,
                    formData
                );

                asset.productImage = upload.data.data.url;
            }

            //console.log(asset, user);

            await axiosInstance.post("/addasset", asset);
            toast.success("Asset added successfully!");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add asset");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAdd)} className="max-w-sm mx-auto">
            <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box p-6 space-y-2">
                <legend className="fieldset-legend text-lg font-semibold">
                    Asset Details
                </legend>

                {/* Product Name */}
                <label className="label">Product Name</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter product name"
                    {...register("name", {
                        required: "Product name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name.message}
                    </p>
                )}

                {/* Product Type */}
                <label className="label">Product Type</label>
                <select
                    className="select select-bordered w-full"
                    {...register("type", {
                        required: "Product type is required",
                    })}
                >
                    <option value="">Select a type</option>
                    <option value="returnable">Returnable</option>
                    <option value="nonreturnable">Non-Returnable</option>
                </select>
                {errors.type && (
                    <p className="text-red-500 text-sm">
                        {errors.type.message}
                    </p>
                )}

                {/* Quantity */}
                <label className="label">Quantity</label>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Enter quantity"
                    {...register("quantity", {
                        required: "Product quantity is required",
                        min: {
                            value: 1,
                            message: "Quantity must be at least 1",
                        },
                    })}
                />
                {errors.quantity && (
                    <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                    </p>
                )}

                {/* Photo */}
                <label className="label">Product Photo</label>
                <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                    {...register("photo", {
                        required: "Product photo is required",
                        validate: {
                            isImage: (files) =>
                                files?.[0]?.type.startsWith("image/") ||
                                "Only image files are allowed",
                        },
                    })}
                />
                {errors.photo && (
                    <p className="text-red-500 text-sm">
                        {errors.photo.message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary w-full mt-4"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding..." : "Add Asset"}
                </button>
            </fieldset>
        </form>
    );
};

export default AddAsset;
