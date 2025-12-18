/* eslint-disable no-unused-vars */
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { auth } from "../firebase/firebase.config";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
});

const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= AUTH ACTIONS =================
    const registerEmployee = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const registerHR = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const profileUpdate = (userProfile) =>
        updateProfile(auth.currentUser, userProfile);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logOut = useCallback(async () => {
        try {
            await signOut(auth);
            setFirebaseUser(null);
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    }, []);

    // ================= FIREBASE AUTH LISTENER =================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            setFirebaseUser(currentUser);

            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken(true);
                    const res = await axiosInstance.get("/refetch", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error("Backend user fetch failed", err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        firebaseUser,
        user,
        loading,
        setLoading,
        registerEmployee,
        registerHR,
        setUser,
        setFirebaseUser,
        profileUpdate,
        login,
        logOut,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
