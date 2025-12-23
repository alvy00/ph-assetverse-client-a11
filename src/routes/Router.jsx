import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import EmployeeRegister from "../pages/registration/EmployeeRegister";
import HRRegister from "../pages/registration/HRRegister";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import AssetList from "../pages/hr/AssetList";
import AddAsset from "../pages/hr/AddAsset";
import AllRequests from "../pages/hr/AllRequests";
import EmployeeList from "../pages/hr/EmployeeList";
import MyAssets from "../pages/employee/MyAssets";
import MyTeam from "../pages/employee/MyTeam";
import EmProfile from "../pages/employee/EmProfile";
import RequestAsset from "../pages/employee/RequestAsset";
import EMDashboardLayout from "../layouts/EMDashboardLayout";
import HRDashboardLayout from "../layouts/HRDashboardLayout";
import HrProfile from "../pages/hr/HrProfile";
import PackageSection from "../components/PackageSection/PackageSection";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
import Payment from "../pages/Payment/Payment";
import Success from "../pages/Payment/Success";
import Cancelled from "../pages/Payment/Cancelled";
import Upgrade from "../pages/hr/Upgrade";
import Support from "../pages/Support";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "registeremployee",
                        element: <EmployeeRegister />,
                    },
                    {
                        path: "registerhr",
                        element: <HRRegister />,
                    },
                ],
            },
            {
                path: "support",
                element: <Support />,
            },
            {
                path: "payment/:name",
                element: (
                    <HRRoute>
                        <Payment />
                    </HRRoute>
                ),
            },
            { path: "payment-success", element: <Success /> },
            { path: "payment-cancelled", element: <Cancelled /> },
        ],
    },
    {
        path: "dashboard",
        element: <EMDashboardLayout />,
        children: [
            {
                path: "myassets",
                element: (
                    <EmployeeRoute>
                        <MyAssets />
                    </EmployeeRoute>
                ),
            },
            {
                path: "myteam",
                element: (
                    <EmployeeRoute>
                        <MyTeam />
                    </EmployeeRoute>
                ),
            },
            {
                path: "emprofile",
                element: (
                    <EmployeeRoute>
                        <EmProfile />
                    </EmployeeRoute>
                ),
            },
            {
                path: "requestasset",
                element: (
                    <EmployeeRoute>
                        {" "}
                        <RequestAsset />
                    </EmployeeRoute>
                ),
            },
        ],
    },
    {
        path: "dashboard",
        element: <HRDashboardLayout />,
        children: [
            {
                path: "assetlist",
                element: (
                    <HRRoute>
                        <AssetList />{" "}
                    </HRRoute>
                ),
            },
            {
                path: "addasset",
                element: (
                    <HRRoute>
                        <AddAsset />
                    </HRRoute>
                ),
            },
            {
                path: "allrequests",
                element: (
                    <HRRoute>
                        {" "}
                        <AllRequests />{" "}
                    </HRRoute>
                ),
            },
            {
                path: "employeelist",
                element: (
                    <HRRoute>
                        <EmployeeList />
                    </HRRoute>
                ),
            },
            {
                path: "upgrade",
                element: (
                    <HRRoute>
                        <Upgrade />
                    </HRRoute>
                ),
            },
            {
                path: "hrprofile",
                element: (
                    <HRRoute>
                        <HrProfile />
                    </HRRoute>
                ),
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;
