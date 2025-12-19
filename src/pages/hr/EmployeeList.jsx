import { useQuery } from "@tanstack/react-query";
import EmployeeCardHR from "../../components/HR/EmployeeCardHR";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

const EmployeeList = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const limit = 10;
    const [currPage, setCurrPage] = useState(0);

    const sub = {
        basic: 5,
        standard: 10,
        premium: 20,
    };
    const {
        data: employeesData = { employees: [], emCount: 0 },
        isLoading: emLoading,
        refetch,
    } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosInstance(
                `/emlist?email=${user.email}&companyName=${encodeURIComponent(
                    user.companyName
                )}&page=${currPage}&limit=${limit}`
            );
            return res.data;
        },
    });

    const pages = Math.ceil(Number(employeesData.emCount) / limit);

    if (emLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading employees...</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen p-4 md:p-8 bg-base-100">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-base-content">
                        Employee List ({employeesData.employees.length}/
                        {sub[user.subscription]})
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        Employees affiliated with your company.
                    </p>
                </div>

                {/* Content */}
                {employeesData.employees.length === 0 ? (
                    <div className="flex justify-center items-center h-40 rounded-lg border border-dashed">
                        <p className="text-gray-500">
                            No employees found for this company.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Employee grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                            {employeesData.employees.map((employee) => (
                                <EmployeeCardHR
                                    key={employee.email}
                                    employee={employee}
                                    refetch={refetch}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                disabled={currPage === 0}
                                onClick={() => setCurrPage((prev) => prev - 1)}
                                className="btn btn-outline"
                            >
                                Previous
                            </button>

                            {[...Array(pages).keys()].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrPage(i)}
                                    className={`btn ${
                                        currPage === i
                                            ? "btn-active"
                                            : "btn-outline"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currPage === pages - 1}
                                onClick={() => setCurrPage((prev) => prev + 1)}
                                className="btn btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EmployeeList;
