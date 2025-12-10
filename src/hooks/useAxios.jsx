import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5173/",
});

const useAxios = () => {
    return instance;
};

export default useAxios;
