const AssetCardReq = ({ asset, onRequest }) => {
    const { assetImage, assetName, assetType, availableQuantity, companyName } =
        asset;

    const isOutOfStock = availableQuantity === 0;

    return (
        <div className="card h-80 w-90 bg-base-200 shadow-md hover:shadow-lg transition duration-200">
            {/* Asset Image */}
            <figure className="p-4">
                <img
                    src={assetImage}
                    alt={assetName}
                    className="h-40 w-full object-contain rounded-lg"
                />
            </figure>

            <div className="card-body pt-0">
                {/* Asset Name */}
                <h2 className="card-title text-base">{assetName}</h2>

                {/* Company */}
                <p className="text-sm text-gray-500">{companyName}</p>

                {/* Meta Info */}
                <div className="flex justify-between items-center mt-2">
                    {/* Type */}
                    <span
                        className={`badge ${
                            assetType === "Returnable"
                                ? "badge-info"
                                : "badge-warning"
                        }`}
                    >
                        {assetType}
                    </span>

                    {/* Quantity */}
                    <span
                        className={`text-sm font-medium ${
                            isOutOfStock ? "text-red-500" : "text-green-600"
                        }`}
                    >
                        {isOutOfStock
                            ? "Out of stock"
                            : `${availableQuantity} available`}
                    </span>
                </div>

                {/* Action */}
                <div className="card-actions mt-4">
                    <button
                        className="btn btn-primary btn-sm w-full"
                        disabled={isOutOfStock}
                        onClick={() => onRequest(asset)}
                    >
                        Request Asset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetCardReq;
