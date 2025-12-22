import { useQuery } from "@tanstack/react-query";
import AssetCardReq from "../../components/Employee/AssetCardReq";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const ASSETS_PER_PAGE = 10;

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [currentPage, setCurrentPage] = useState(0);

    const {
        data: assetsData = { assets: [], assetCount: 0 },
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["assets", currentPage],
        queryFn: async () => {
            const { data } = await axiosInstance.get(
                `/assets?page=${currentPage}&limit=${ASSETS_PER_PAGE}`
            );
            return data || { assets: [], assetCount: 0 };
        },
        keepPreviousData: true,
    });

    const totalPages = Math.ceil(assetsData.assetCount / ASSETS_PER_PAGE);

    const handleRequest = async (asset) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        const {
            _id,
            productName,
            productImage,
            productType,
            hrEmail,
            companyName,
        } = asset;

        const result = await Swal.fire({
            title: "Request this asset?",
            input: "text",
            inputLabel: "Note",
            inputPlaceholder: "Type your note here...",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Request",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosInstance.post("/reqasset", {
                assetId: _id,
                assetName: productName,
                assetType: productType,
                assetImage: productImage,
                requesterName: user.name,
                requesterEmail: user.email,
                hrEmail,
                companyName,
                note: result.value || "",
            });

            toast.success(`Requested ${productName}`);
            refetch();

            Swal.fire({
                title: "Requested!",
                text: "Your asset request has been submitted.",
                icon: "success",
            });
        } catch (error) {
            const message =
                error.response?.data?.message || "Failed to request asset";
            toast.error(message);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message="Failed to load assets" />;

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Request Asset"
                    description="Browse available company assets and submit a request."
                />
                {assetsData?.assets?.length === 0 ? (
                    <EmptyState message="No assets available. Please check back later." />
                ) : (
                    <>
                        <AssetsGrid
                            assets={assetsData.assets}
                            onRequest={handleRequest}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

/* ---------- Subcomponents ---------- */

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg font-medium">{message}</p>
    </div>
);

const PageHeader = ({ title, description }) => (
    <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-base-content/70 mt-1">{description}</p>
    </div>
);

const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-500">{message}</p>
    </div>
);

const AssetsGrid = ({ assets, onRequest }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {assets.map((asset) => (
            <AssetCardReq key={asset._id} asset={asset} onRequest={onRequest} />
        ))}
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="join justify-center">
        <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="join-item btn"
        >
            Previous
        </button>

        {[...Array(totalPages).keys()].map((i) => (
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`join-item btn ${
                    currentPage === i ? "btn-active" : ""
                }`}
            >
                {i + 1}
            </button>
        ))}

        <button
            disabled={currentPage === totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="join-item btn"
        >
            Next
        </button>
    </div>
);

export default RequestAsset;
