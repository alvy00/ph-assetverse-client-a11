const AssetCardReq = ({ asset, onRequest }) => {
    const {
        productImage,
        productName,
        productType,
        availableQuantity,
        companyName,
    } = asset;

    const isOutOfStock = availableQuantity === 0;

    return (
        <div className="group card h-100 w-80 bg-base-100 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Image */}
            <figure className="relative bg-base-200 rounded-t-xl overflow-hidden">
                <img
                    src={productImage}
                    alt={productName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Type Badge */}
                <span
                    className={`absolute top-3 right-3 badge badge-sm font-medium ${
                        productType === "Returnable"
                            ? "badge-info"
                            : "badge-warning"
                    }`}
                >
                    {productType?.toUpperCase()}
                </span>
            </figure>

            {/* Content */}
            <div className="card-body gap-3">
                {/* Title */}
                <h2 className="text-lg font-semibold line-clamp-1">
                    {productName}
                </h2>

                {/* Company */}
                <p className="text-sm text-gray-500">{companyName}</p>

                {/* Divider */}
                <div className="divider my-1"></div>

                {/* Stock Info */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Availability</span>
                    <span
                        className={`font-semibold ${
                            isOutOfStock ? "text-error" : "text-success"
                        }`}
                    >
                        {isOutOfStock
                            ? "Out of Stock"
                            : `${availableQuantity} Available`}
                    </span>
                </div>

                {/* Action */}
                <button
                    className={`btn btn-sm w-full mt-2 ${
                        isOutOfStock ? "btn-disabled" : "btn-primary"
                    }`}
                    disabled={isOutOfStock}
                    onClick={() => onRequest(asset)}
                >
                    {isOutOfStock ? "Unavailable" : "Request Asset"}
                </button>
            </div>
        </div>
    );
};

export default AssetCardReq;
