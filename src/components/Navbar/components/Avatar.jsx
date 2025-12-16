const Avatar = ({ src, name }) => (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
        {src ? (
            <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
            <span className="text-sm font-medium text-gray-700">
                {name?.charAt(0) || "PR"}
            </span>
        )}
    </div>
);

export default Avatar;
