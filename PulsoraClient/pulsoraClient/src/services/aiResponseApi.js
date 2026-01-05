import apiClient from "./api";

export const getAIResponsesByUser = async (userId) => {
    const res = await apiClient.get(`/api/v1/ai-responses/user/${userId}`);
    return res.data;
};

