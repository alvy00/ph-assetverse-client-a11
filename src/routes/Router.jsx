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
import RequestAsset from "../pages/employee/RequestAsset";
import EMDashboardLayout from "../layouts/EMDashboardLayout";
import HRDashboardLayout from "../layouts/HRDashboardLayout";

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
                    { path: "login", element: <Login /> },
                    { path: "registeremployee", element: <EmployeeRegister /> },
                    { path: "registerhr", element: <HRRegister /> },
                ],
            },
        ],
    },
    {
        path: "dashboard",
        element: <EMDashboardLayout />,
        children: [
            { path: "myassets", element: <MyAssets /> },
            { path: "myteam", element: <MyTeam /> },
            { path: "requestasset", element: <RequestAsset /> },
        ],
    },
    {
        path: "dashboard",
        element: <HRDashboardLayout />,
        children: [
            { path: "assetlist", element: <AssetList /> },
            { path: "addasset", element: <AddAsset /> },
            { path: "allrequests", element: <AllRequests /> },
            { path: "employeelist", element: <EmployeeList /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;
