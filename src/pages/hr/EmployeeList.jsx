import { useQuery } from "@tanstack/react-query";
import EmployeeCardHR from "../../components/HR/EmployeeCardHR";

const myCompany = "techhive";

const EmployeeList = () => {
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("/users.json");
            return res.json();
        },
    });

    const { data: affData = [], isLoading: affLoading } = useQuery({
        queryKey: ["affData"],
        queryFn: async () => {
            const res = await fetch("/affdata.json");
            return res.json();
        },
    });

    if (usersLoading || affLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading employees...</p>
            </div>
        );
    }

    const myAffData = affData.filter(
        (aff) => aff.companyName.toLowerCase() === myCompany.toLowerCase()
    );

    const employees = users.filter((user) =>
        myAffData.some(
            (aff) =>
                aff.employeeEmail.toLowerCase() === user.email.toLowerCase()
        )
    );

    return (
        <section className="min-h-screen p-4 md:p-8 bg-base-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-base-content">
                        Employee List
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        Employees affiliated with your company.
                    </p>
                </div>

                {/* Content */}
                {employees.length === 0 ? (
                    <div className="flex justify-center items-center h-40 rounded-lg border border-dashed">
                        <p className="text-gray-500">
                            No employees found for this company.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {employees.map((employee) => (
                            <EmployeeCardHR
                                key={employee.email}
                                employee={employee}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EmployeeList;
