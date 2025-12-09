import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import EmployeeRegister from "../pages/EmployeeRegister";
import HRRegister from "../pages/HRRegister";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";

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
    { path: "*", element: <NotFound /> },
]);

export default router;
