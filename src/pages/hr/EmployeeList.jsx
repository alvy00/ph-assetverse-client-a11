import { useQuery } from "@tanstack/react-query";
import EmployeeCardHR from "../../components/HR/EmployeeCardHR";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const EmployeeList = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const sub = {
        basic: 5,
        standard: 10,
        premium: 20,
    };
    const {
        data: employees = [],
        isLoading: emLoading,
        refetch,
    } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosInstance(
                `/emlist?email=${user.email}&companyName=${encodeURIComponent(
                    user.companyName
                )}`
            );
            return res.data;
        },
    });

    if (emLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading employees...</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-4 md:p-8 bg-base-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-base-content">
                        Employee List ({employees.length}/
                        {sub[user.subscription]})
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
                                refetch={refetch}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EmployeeList;
