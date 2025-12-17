/* eslint-disable no-unused-vars */

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const EditAsset = ({ asset, refetch }) => {
    const axiosInstance = useAxios();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            productName: asset.productName,
            productType: asset.productType,
            productImage: asset.productImage,
        },
    });
    const modalRef = useRef();

    const handleUpdate = async (data) => {
        try {
            const { pName, pType, pImage } = data;

            await axiosInstance.patch(`/assets/${asset._id}`, {
                productName: pName,
                productType: pType,
                productImage: pImage,
            });

            toast.success("Asset was updated!");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update asset");
        }
    };

    return (
        <>
            <button
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
                        <form
                            method="dialog"
                            onSubmit={handleSubmit(handleUpdate)}
                        >
                            <label className="label">Product Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mb-2"
                                {...register("productName")}
                            />

                            <label className="label">Product Type</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("type")}
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
                                {...register("photo")}
                            />

                            <button
                                onClick={() => modalRef.current.close()}
                                className="btn"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default EditAsset;
