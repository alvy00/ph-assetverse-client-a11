import { useQuery } from "@tanstack/react-query";
import AssetCardReq from "../../components/Employee/AssetCardReq";
import { toast } from "react-toastify";

const RequestAsset = () => {
    const {
        data: assets = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const res = await fetch("/assets.json");
            if (!res.ok) throw new Error("Failed to fetch assets");
            return res.json();
        },
    });

    const onRequest = (asset) => {
        toast.success(`Requested ${asset.assetName}`);
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
                    <h1 className="text-3xl font-bold text-base-content">
                        Request Asset
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        Browse available company assets and submit a request.
                    </p>
                </div>

                {/* Empty State */}
                {assets.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
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
                            key={asset.id}
                            asset={asset}
                            onRequest={() => onRequest(asset)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RequestAsset;
