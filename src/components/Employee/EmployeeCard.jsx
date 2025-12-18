const EmployeeCard = ({ employee }) => {
    const { name, email, role } = employee;

    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    return (
        <div className="card bg-base-200 w-80 shadow-md hover:shadow-lg transition">
            <figure className="px-6 pt-6">
                <div className="rounded-full w-24 h-24 bg-gray-300 text-gray-700 flex items-center justify-center mx-auto font-bold text-xl">
                    {initials}
                </div>
            </figure>

            <div className="card-body items-center text-center p-4">
                {/* Name */}
                <h2 className="card-title text-lg">{name}</h2>

                {/* Position */}
                <span className="badge badge-primary badge-outline">
                    {role}
                </span>

                {/* Email */}
                <p className="text-sm text-gray-500 break-all">{email}</p>
            </div>
        </div>
    );
};

export default EmployeeCard;
