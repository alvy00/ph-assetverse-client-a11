import { RiHome4Line, RiTeamLine } from "react-icons/ri";
import { CiCirclePlus, CiViewList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link, Outlet } from "react-router";

const EMDashboardLayout = () => {
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
                                    EM
                                </div>
                            </div>

                            <div className="is-drawer-close:hidden">
                                <p className="text-sm font-semibold">
                                    Employee
                                </p>
                                <p className="text-xs text-gray-500">
                                    Dashboard
                                </p>
                            </div>
                        </div>

                        <ul className="menu w-full grow gap-3">
                            <Link to="/">
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
                            </Link>

                            <Link to="/dashboard/myassets">
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Assets"
                                    >
                                        <CiViewList className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            My Assets
                                        </span>
                                    </button>
                                </li>
                            </Link>

                            <Link to="/dashboard/myteam">
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Team"
                                    >
                                        <RiTeamLine className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            My Team
                                        </span>
                                    </button>
                                </li>
                            </Link>
                            <Link to="/dashboard/emprofile">
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
                            </Link>

                            <Link to="/dashboard/requestasset">
                                <li>
                                    <button
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Request Asset"
                                    >
                                        <CiCirclePlus className="text-3xl" />
                                        <span className="is-drawer-close:hidden">
                                            Request Asset
                                        </span>
                                    </button>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EMDashboardLayout;
