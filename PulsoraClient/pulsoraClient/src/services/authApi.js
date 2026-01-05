import apiClient from "./api";

// LOGIN
export const login = async (credentials) => {
    const response = await apiClient.post(
        "/api/v1/auth/login",
        credentials
    );
    return response.data;
};

// REGISTER
export const register = async (userData) => {
    const response = await apiClient.post(
        "/api/v1/auth/register",
        userData
    );
    return response.data;
};
