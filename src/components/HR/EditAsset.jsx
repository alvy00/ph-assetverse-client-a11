/* eslint-disable react-hooks/refs */
/* eslint-disable no-unused-vars */

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const EditAsset = ({ asset, refetch }) => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            pName: asset.productName,
            pType: asset.productType,
            pImage: asset.productImage,
        },
    });
    const modalRef = useRef();

    const [loading, setLoading] = useState(false);

    const handleUpdate = async (data) => {
        setLoading(true);
        try {
            const { pName, pType } = data;
            const imageFile = data.pImage[0];
            let pImage = asset.productImage;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);

                const upload = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_IMAGEHOST
                    }`,
                    formData
                );

                pImage = upload.data.data.url;
            }

            await axiosInstance.patch(
                `/assets/${asset._id}?email=${user.email}`,
                {
                    productName: pName,
                    productType: pType,
                    productImage: pImage,
                }
            );

            toast.success("Asset was updated!");
            refetch();
            modalRef.current?.close();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update asset");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => modalRef.current.showModal()}
                className="btn btn-sm btn-outline btn-info flex items-center gap-1"
            >
                <FiEdit />
                Edit
            </button>
            <dialog
                ref={modalRef}
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Asset</h3>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mb-2"
                                {...register("pName")}
                            />

                            <label className="label">Product Type</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("pType")}
                            >
                                <option value="returnable">Returnable</option>
                                <option value="nonreturnable">
                                    Non-Returnable
                                </option>
                            </select>

                            <label className="label">Product Photo</label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                                {...register("pImage")}
                            />

                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => modalRef.current.close()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default EditAsset;
