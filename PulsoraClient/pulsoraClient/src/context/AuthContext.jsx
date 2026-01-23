import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        return {
            userId: localStorage.getItem("userId"),
            username: localStorage.getItem("username"),
        };
    });

    const login = async (email, password) => {
        const res = await apiClient.post("/api/v1/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);

        setUser({
            userId: res.data.userId,
            username: res.data.username,
        });

        return true;
    };

    const register = async (username, email, password) => {
        await apiClient.post("/api/v1/auth/register", {
            username,
            email,
            password,
        });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
