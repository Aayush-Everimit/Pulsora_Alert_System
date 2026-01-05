import apiClient from "./api";

export const getAIResponsesByUser = async (userId) => {
    const res = await apiClient.get(`/ai-responses/user/${userId}`);
    return res.data;
};
