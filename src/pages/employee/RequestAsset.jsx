import { useQuery } from "@tanstack/react-query";
import AssetCardReq from "../../components/Employee/AssetCardReq";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const {
        data: assets = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/assets");
            return data || [];
        },
    });

    const onRequest = async (asset) => {
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
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Request Asset</h1>
                    <p className="text-base-content/70 mt-1">
                        Browse available company assets and submit a request.
                    </p>
                </div>

                {/* Empty State */}
                {assets.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <p className="text-lg font-medium text-gray-500">
                            No assets available
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Please check back later.
                        </p>
                    </div>
                )}

                {/* Assets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assets.map((asset) => (
                        <AssetCardReq
                            key={asset._id}
                            asset={asset}
                            onRequest={onRequest}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RequestAsset;
