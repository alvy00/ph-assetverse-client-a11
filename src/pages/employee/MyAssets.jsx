/* eslint-disable react-hooks/set-state-in-effect */
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import Search from "../../components/Search";
import Filter from "../../components/Filter";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const statusStyles = {
    Approved: "badge-success",
    Pending: "badge-warning",
    Rejected: "badge-error",
    Returned: "badge-neutral",
};

const MyAssets = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const tableRef = useRef();

    const {
        data: assets = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/myassets?email=${user.email}`
            );
            return res.data;
        },
    });

    //console.log(assets);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const typeFiltered = assets.filter((asset) => {
        if (filter === "all") return true;
        return asset.assetType?.toLowerCase() === filter.toLowerCase();
    });

    const filteredAssets = typeFiltered.filter((asset) =>
        asset.assetName?.toLowerCase().includes(search.toLowerCase())
    );

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // PDF using jsPDF
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: "a4",
        });

        doc.setFontSize(18);
        doc.text("My Assets", 40, 40);

        const tableColumn = [
            "Name",
            "Type",
            "Company",
            "Request Date",
            "Approval Date",
            "Status",
        ];

        const tableRows = assets.map((asset) => [
            asset.assetName,
            asset.assetType,
            asset.companyName,
            new Date(asset.requestDate).toLocaleDateString(),
            asset.approvalDate
                ? new Date(asset.approvalDate).toLocaleDateString()
                : "--",
            asset.requestStatus.toUpperCase(),
        ]);

        autoTable(doc, {
            startY: 60,
            head: [tableColumn],
            body: tableRows,
            styles: {
                fontSize: 10,
                cellPadding: 5,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: "bold",
            },
        });

        doc.save("my_assets.pdf");
    };

    if (isError) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg font-medium">
                    Failed to load assets
                </p>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content">
                            My Assets
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            View and manage all assets assigned to you.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Filter filter={filter} handleFilter={handleFilter} />
                        <Search setSearch={setSearch} />
                    </div>
                </div>

                {/* Content */}
                {assets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-lg font-medium text-gray-500">
                            No assets found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            You haven’t requested or received any assets yet.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-sm">
                        <table
                            ref={tableRef}
                            className="table table-zebra w-full print-safe"
                        >
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
                                        asset.assetType.toLowerCase() ===
                                            "returnable" &&
                                        asset.requestStatus.toLowerCase() ===
                                            "approved";

                                    return (
                                        <>
                                            {" "}
                                            <tr
                                                key={asset.id}
                                                className="text-center"
                                            >
                                                <td>
                                                    <div className="avatar mx-auto">
                                                        <div className="mask rounded-md h-20 w-30">
                                                            <img
                                                                src={
                                                                    asset.assetImage
                                                                }
                                                                alt={
                                                                    asset.assetName
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="font-medium">
                                                    {asset.assetName}
                                                </td>

                                                <td>
                                                    <span className="badge badge-outline">
                                                        {asset.assetType.toUpperCase()}
                                                    </span>
                                                </td>

                                                <td>
                                                    {asset.companyName.toUpperCase()}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        asset.requestDate
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        asset.approvalDate
                                                    ).toLocaleDateString() ||
                                                        "--"}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            statusStyles[
                                                                asset
                                                                    .requestStatus
                                                            ]
                                                        }`}
                                                    >
                                                        {asset.requestStatus.toUpperCase()}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline btn-success"
                                                        disabled={!canReturn}
                                                    >
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                                <tr>
                                    <td
                                        className="text-center border border-primary"
                                        colSpan={8}
                                        rowSpan={6}
                                    >
                                        <button
                                            onClick={generatePDF}
                                            className="btn btn-primary"
                                        >
                                            Print
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyAssets;
