const BirthdayCard = ({ employee }) => {
    const { name, photo, dob } = employee;

    // Create initials if no photo
    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    // Format birthday (Month Day)
    const birthday = new Date(dob).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

    return (
        <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg shadow-sm">
            {/* Avatar */}
            {photo ? (
                <img
                    src={photo}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold">
                    {initials}
                </div>
            )}

            {/* Name & Date */}
            <div className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-sm text-gray-500">{birthday}</span>
            </div>
        </div>
    );
};

export default BirthdayCard;
