import apiClient from "./api";

export const getUserById = async (userId) => {
    const res = await apiClient.get(`/api/v1/users/${userId}`);
    return res.data;
};

export const updateUser = async (userId, userData) => {
    const res = await apiClient.put(`/api/v1/users/${userId}`, userData);
    return res.data;
};
