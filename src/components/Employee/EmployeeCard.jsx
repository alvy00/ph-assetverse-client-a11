const EmployeeCard = ({ employee }) => {
    const { photo, name, email, position } = employee;

    return (
        <div className="card bg-base-200 w-80 shadow-md hover:shadow-lg transition">
            <figure className="px-6 pt-6">
                <img
                    src={photo}
                    alt={name}
                    className="rounded-full w-24 h-24 object-cover mx-auto"
                />
            </figure>

            <div className="card-body items-center text-center p-4">
                {/* Name */}
                <h2 className="card-title text-lg">{name}</h2>

                {/* Position */}
                <span className="badge badge-primary badge-outline">
                    {position}
                </span>

                {/* Email */}
                <p className="text-sm text-gray-500 break-all">{email}</p>
            </div>
        </div>
    );
};

export default EmployeeCard;
