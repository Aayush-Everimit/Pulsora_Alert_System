import apiClient from "./api";

export const submitUserResponse = async (userId, eventId, responseType, description = "") => {
    const payload = {
        userId,
        disasterEventId: eventId, // ✅ matches your DTO field name
        responseType,             // ✅ matches DTO field name
        description,
    };

    const res = await apiClient.post("/api/v1/user-responses", payload);
    return res.data;
};
