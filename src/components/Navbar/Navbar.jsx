import { Link } from "react-router";
import logo from "../../assets/assetverse.png";
const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Home</a>
                        </li>
                        <Link to="/myassets">
                            {" "}
                            <li>
                                <a>My Assets</a>
                            </li>
                        </Link>

                        <Link to="/myteam">
                            {" "}
                            <li>
                                <a>My Team</a>
                            </li>
                        </Link>
                        <Link to="/requestasset">
                            {" "}
                            <li>
                                <a>Request Asset</a>
                            </li>
                        </Link>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
                <img
                    className="border border-base-300 rounded-4xl hover:bg-base-200 cursor-pointer m-1 p-2"
                    src={logo}
                    alt="logo"
                    height={85}
                    width={85}
                />
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <details>
                            <summary>Workspace</summary>
                            <ul className="p-2 bg-base-100 w-40 z-1">
                                <Link to="/myassets">
                                    {" "}
                                    <li>
                                        <a>My Assets</a>
                                    </li>
                                </Link>

                                <Link to="/myteam">
                                    {" "}
                                    <li>
                                        <a>My Team</a>
                                    </li>
                                </Link>
                                <Link to="/requestasset">
                                    {" "}
                                    <li>
                                        <a>Request Asset</a>
                                    </li>
                                </Link>
                            </ul>
                        </details>
                    </li>
                    <Link to="/profile">
                        {" "}
                        <li>
                            <a>Profile</a>
                        </li>
                    </Link>
                    <li>
                        <a>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
