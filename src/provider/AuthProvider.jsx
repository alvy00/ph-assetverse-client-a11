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
import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
});

const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= AUTH ACTIONS =================
    const registerEmployee = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const registerHR = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const profileUpdate = (userProfile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userProfile);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        setFirebaseUser(null);
        setUser(null);
        setLoading(false);
    };

    // ================= FIREBASE AUTH LISTENER =================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setFirebaseUser(currentUser);
            setLoading(false); // Firebase is done initializing
        });

        return () => unsubscribe();
    }, []);

    // ================= BACKEND USER REFETCH =================
    useEffect(() => {
        if (!firebaseUser) return; // ⛔ DO NOTHING until Firebase is ready

        const fetchUser = async () => {
            try {
                setLoading(true);

                // 🔐 ALWAYS get fresh Firebase token
                const token = await firebaseUser.getIdToken(true);

                const res = await axiosInstance.get("/refetch", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
            } catch (error) {
                console.error("Auth restore failed", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [firebaseUser]);

    const authInfo = {
        firebaseUser,
        user,
        loading,
        registerEmployee,
        registerHR,
        setUser,
        setFirebaseUser,
        profileUpdate,
        login,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
