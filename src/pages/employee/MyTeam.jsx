/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import EmployeeCard from "../../components/Employee/EmployeeCard";
import { useState } from "react";
import CompanyTabs from "../../components/Employee/CompanyTabs";

const myEmail = "aisha.rahman@gmail.com";

const MyTeam = () => {
    const { data: affData = [] } = useQuery({
        queryKey: ["affData"],
        queryFn: async () => {
            const data = await fetch("/affdata.json");
            return data.json();
        },
    });

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const data = await fetch("/users.json");
            return data.json();
        },
    });

    const [checkedComs, setCheckedComs] = useState([]);

    const companies = affData.filter((aff) => aff.employeeEmail === myEmail);

    const comTabs = [
        ...new Set(companies.map((company) => company.companyName)),
    ];

    const comsAffiliated = affData.filter((data) =>
        checkedComs.some(
            (com) => com.toLowerCase() === data.companyName.toLowerCase()
        )
    );

    const usersAffiliated = users.filter((user) =>
        comsAffiliated.some(
            (com) =>
                com.employeeEmail.toLowerCase() === user.email.toLowerCase() &&
                myEmail !== user.email.toLowerCase()
        )
    );

    return (
        <section className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-base-content">
                        My Team
                    </h1>
                    <p className="text-base-content/70 mt-1">
                        View teammates from your affiliated companies.
                    </p>
                </div>

                {/* Content */}
                {comTabs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-lg font-medium text-gray-500">
                            You are not affiliated with any company yet.
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Once you join a company, your team members will
                            appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <CompanyTabs
                                comTabs={comTabs}
                                checkedComs={checkedComs}
                                setCheckedComs={setCheckedComs}
                            />
                        </div>

                        {checkedComs.length === 0 ? (
                            <div className="flex justify-center items-center h-40">
                                <p className="text-gray-500">
                                    Please select a company tab to see your
                                    team.
                                </p>
                            </div>
                        ) : usersAffiliated.length === 0 ? (
                            <div className="flex justify-center items-center h-40">
                                <p className="text-gray-500">
                                    No employees found for the selected
                                    companies.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {usersAffiliated.map((employee) => (
                                    <EmployeeCard
                                        key={employee.email}
                                        employee={employee}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default MyTeam;
