/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import Filter from "../../components/Filter";

const statusStyles = {
    Approved: "badge-success",
    Pending: "badge-warning",
    Rejected: "badge-error",
    Returned: "badge-neutral",
};

const MyAssets = () => {
    const {
        data: assets = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const res = await fetch("/myassets.json");
            if (!res.ok) throw new Error("Failed to fetch assets");
            return res.json();
        },
    });

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const typeFiltered = assets.filter((asset) => {
        if (filter === "all") {
            return true;
        }

        return asset.assetType.toLowerCase() === filter.toLowerCase();
    });

    const filteredAssets = typeFiltered.filter((asset) =>
        asset.assetName.toLowerCase().includes(search.toLowerCase())
    );

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    if (isLoading) {
        return <p className="text-center py-10">Loading assets...</p>;
    }

    if (isError) {
        return (
            <p className="text-center py-10 text-red-500">
                Failed to load assets
            </p>
        );
    }

    //console.log(search);
    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mb-4">My Assets</h1>
                <div className="flex gap-3">
                    <Filter filter={filter} handleFilter={handleFilter} />
                    <Search setSearch={setSearch} />
                </div>
            </div>

            {assets.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No assets found
                </p>
            ) : (
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Request Date</th>
                            <th>Approval Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAssets.map((asset) => {
                            const canReturn =
                                asset.assetType === "Returnable" &&
                                asset.status === "Approved";

                            return (
                                <tr key={asset.id} className="text-center">
                                    {/* Image */}
                                    <td>
                                        <div className="avatar mx-auto">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={asset.assetImage}
                                                    alt={asset.assetName}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Name */}
                                    <td className="font-medium">
                                        {asset.assetName}
                                    </td>

                                    {/* Type */}
                                    <td>
                                        <span className="badge badge-outline text-nowrap">
                                            {asset.assetType}
                                        </span>
                                    </td>

                                    {/* Company */}
                                    <td>{asset.companyName}</td>

                                    {/* Request Date */}
                                    <td>{asset.requestDate}</td>

                                    {/* Approval Date */}
                                    <td>{asset.approvalDate || "--"}</td>

                                    {/* Status */}
                                    <td>
                                        <span
                                            className={`badge ${
                                                statusStyles[asset.status]
                                            }`}
                                        >
                                            {asset.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <button
                                            className="btn btn-md btn-outline btn-success"
                                            disabled={!canReturn}
                                        >
                                            Return
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyAssets;
