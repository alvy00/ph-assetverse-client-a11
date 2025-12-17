import { NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { RiHome4Line } from "react-icons/ri";
import { CiCirclePlus, CiViewList } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { PiGitPullRequestThin } from "react-icons/pi";
import { LuPackagePlus } from "react-icons/lu";

const HRDashboardLayout = () => {
    const { user } = useAuth();
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            {/* Sidebar toggle icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className="my-1.5 inline-block size-5"
                            >
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </label>
                        <div className="px-4 cursor-default">Dashboard</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">{<Outlet />}</div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="flex min-h-full flex-col items-center justify-center bg-base-200 is-drawer-close:w-17 is-drawer-open:w-64">
                        {/* Sidebar content*/}
                        <div className="w-full px-4 py-[13.5px] flex items-center gap-3 border-b border-base-300">
                            <div className="avatar">
                                <div className="w-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                                    {user?.name
                                        ? `${user.name
                                              .split("")[0]
                                              .toUpperCase()}`
                                        : ""}
                                </div>
                            </div>

                            <div className="is-drawer-close:hidden">
                                <p className="text-sm font-semibold">HR</p>
                                <p className="text-xs text-gray-500">
                                    Dashboard
                                </p>
                            </div>
                        </div>

                        <ul className="menu w-full grow gap-3">
                            <NavLink to="/">
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Home"
                                    >
                                        <RiHome4Line className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Home
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/assetlist"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Asset List"
                                    >
                                        <CiViewList className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Asset List
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/allrequests"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="All Requests"
                                    >
                                        <PiGitPullRequestThin className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            All Requests
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/employeelist"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Employee List"
                                    >
                                        <IoMdPeople className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Employee List
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/upgrade"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Upgrade Package"
                                    >
                                        <LuPackagePlus className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Upgrade Package
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/addasset"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Add Asset"
                                    >
                                        <CiCirclePlus className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Add Asset
                                        </span>
                                    </button>
                                </li>
                            </NavLink>

                            <NavLink
                                to="/dashboard/hrprofile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-primary text-primary-content rounded-3xl"
                                        : ""
                                }
                            >
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Profile"
                                    >
                                        <CgProfile className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Profile
                                        </span>
                                    </button>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HRDashboardLayout;
