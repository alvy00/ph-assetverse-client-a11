/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Search from "../../components/Search";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";

const AssetList = () => {
    const axiosInstance = useAxios();
    const {
        data: assets = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["companyAssets"],
        queryFn: async () => {
            const res = await axiosInstance.get("/assets");
            return res.data;
        },
    });
    console.log(assets);
    const [search, setSearch] = useState("");

    const filteredAssets = assets.filter((asset) =>
        asset.productName.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">Failed to load assets.</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            Assets List
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            View and manage all company assets
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Search setSearch={setSearch} />
                    </div>
                </div>

                {/* Table */}
                {filteredAssets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-lg font-medium text-gray-500">
                            No assets found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            You haven’t added any assets yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200">
                                <tr className="text-center">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssets.map((asset) => (
                                    <tr
                                        key={asset.id}
                                        className="text-center hover:bg-base-200 transition-colors"
                                    >
                                        <td>
                                            <div className="avatar mx-auto">
                                                <div className="mask h-20 w-30">
                                                    <img
                                                        src={asset.productImage}
                                                        alt={asset.productName}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="font-medium">
                                            {asset.productName}
                                        </td>

                                        <td>
                                            <span className="badge badge-outline">
                                                {asset.productType}
                                            </span>
                                        </td>

                                        <td>
                                            {asset.availableQuantity || "--"}
                                        </td>

                                        <td>
                                            {new Date(
                                                asset.dateAdded
                                            ).toLocaleDateString() || "--"}
                                        </td>

                                        <td>
                                            <div className="flex justify-center items-center gap-2">
                                                <button className="btn btn-sm btn-outline btn-warning flex items-center gap-1">
                                                    <FiEdit />
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                                                    <FiTrash2 />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AssetList;
