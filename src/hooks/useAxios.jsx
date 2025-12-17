import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
});

const useAxios = () => {
    const { firebaseUser, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosInstance.interceptors.request.use(
            async (config) => {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken();
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;

                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/auth/login", { replace: true });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(resInterceptor);
        };
    }, [firebaseUser, logOut, navigate]);

    return axiosInstance;
};

export default useAxios;
