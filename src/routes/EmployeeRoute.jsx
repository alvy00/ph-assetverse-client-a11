import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";

const EmployeeRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user.role !== "employee") {
        if (user) logOut();
        return <Navigate state={location.pathname} to="/" replace></Navigate>;
    }
    return children;
};

export default EmployeeRoute;
