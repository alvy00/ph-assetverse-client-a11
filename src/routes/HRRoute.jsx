import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";

const HRRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!user || user.role !== "employee") {
        return <Navigate state={location.pathname} to="/" replace></Navigate>;
    }
    return children;
};

export default HRRoute;
