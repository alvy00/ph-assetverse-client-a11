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
        <div className="flex flex-col gap-5 justify-center items-center">
            {comTabs.length === 0 ? (
                <p className="text-gray-500">
                    You are not affiliated with any company yet.
                </p>
            ) : (
                <>
                    <CompanyTabs
                        comTabs={comTabs}
                        checkedComs={checkedComs}
                        setCheckedComs={setCheckedComs}
                    />

                    {checkedComs.length === 0 ? (
                        <p className="text-gray-500">
                            Please select a company tab to see your team.
                        </p>
                    ) : usersAffiliated.length === 0 ? (
                        <p className="text-gray-500">
                            No employees found for the selected companies.
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 gap-7">
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
    );
};

export default MyTeam;
