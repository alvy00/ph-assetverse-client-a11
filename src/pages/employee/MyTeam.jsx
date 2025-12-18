/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import EmployeeCard from "../../components/Employee/EmployeeCard";
import { useState } from "react";
import CompanyTabs from "../../components/Employee/CompanyTabs";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import BirthdayCard from "../../components/Employee/BirthdayCard";

const myEmail = "aisha.rahman@gmail.com";

const MyTeam = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: affData = [] } = useQuery({
        queryKey: ["affData"],
        queryFn: async () => {
            const res = await axiosInstance(`/affdata?email=${user.email}`);
            return res.data;
        },
    });

    const [checkedComs, setCheckedComs] = useState([]);

    const affiliatedData = affData.data;
    const comTabs = affData.uniqueComs || [];
    const comsAffiliated = affData.comsAffData;
    const usersAffiliated = affData.usersAffData || [];

    //console.log(affiliatedData, comTabs, comsAffiliated, usersAffiliated);

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
                {comTabs?.length === 0 ? (
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

                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Upcoming Birthdays
                    </h2>

                    {usersAffiliated.filter((user) => {
                        if (!user.dob) return false;
                        const userMonth = new Date(user.dob).getMonth();
                        const currentMonth = new Date().getMonth();
                        return userMonth === currentMonth;
                    }).length === 0 ? (
                        <p className="text-gray-500">
                            No birthdays this month.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {usersAffiliated
                                .filter((user) => {
                                    if (!user.dob) return false;
                                    const userMonth = new Date(
                                        user.dob
                                    ).getMonth();
                                    const currentMonth = new Date().getMonth();
                                    return userMonth === currentMonth;
                                })
                                .map((user) => (
                                    <BirthdayCard
                                        key={user.email}
                                        employee={user}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyTeam;
