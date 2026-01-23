import apiClient from "./api";

export const submitUserResponse = async (userId, eventId, responseType, description = "") => {
    const payload = {
        userId,
        disasterEventId: eventId,
        responseType,
        description,
    };

    const res = await apiClient.post("/api/v1/user-responses", payload);
    return res.data;
};
