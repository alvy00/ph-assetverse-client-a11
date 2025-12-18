/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Search from "../../components/Search";
import Filter from "../../components/Filter";
import { FiCheck, FiX, FiRotateCcw } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const mockStatusStyles = {
    pending: "badge-warning",
    approved: "badge-success",
    rejected: "badge-error",
};

const AllRequests = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [search, setSearch] = useState("");

    const {
        data: requests = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["assetRequests"],
        queryFn: async () => {
            const requests = await axiosInstance(
                `/requests?companyName=${encodeURIComponent(user.companyName)}`
            );
            return requests.data;
        },
    });

    const filteredRequests = requests?.filter((req) =>
        req?.requesterName?.toLowerCase().includes(search.toLowerCase())
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
                <p className="text-red-500 text-lg">Failed to load requests.</p>
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
                            All Asset Requests
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            Review and manage employee asset requests.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Search setSearch={setSearch} />
                    </div>
                </div>

                {/* Table */}
                {filteredRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-lg font-medium text-gray-500">
                            No requests found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            There are no asset requests matching your search or
                            filter criteria.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200">
                                <tr className="text-center">
                                    <th>Employee</th>
                                    <th>Asset</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRequests.map((req) => {
                                    const {
                                        _id,
                                        requesterName,
                                        assetName,
                                        requestDate,
                                        requestStatus,
                                    } = req;
                                    const canApprove =
                                        requestStatus === "pending";

                                    return (
                                        <tr
                                            key={_id}
                                            className="text-center hover:bg-base-200 transition-colors"
                                        >
                                            <td className="font-medium">
                                                {requesterName}
                                            </td>

                                            <td>
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>{assetName}</span>
                                                </div>
                                            </td>

                                            <td>
                                                {new Date(
                                                    requestDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${mockStatusStyles[requestStatus]}`}
                                                >
                                                    {requestStatus}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="flex justify-center items-center gap-2">
                                                    {canApprove ? (
                                                        <>
                                                            <button className="btn btn-sm btn-success flex items-center gap-1">
                                                                <FiCheck />
                                                                Approve
                                                            </button>
                                                            <button className="btn btn-sm btn-error flex items-center gap-1">
                                                                <FiX />
                                                                Reject
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span>---</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllRequests;
