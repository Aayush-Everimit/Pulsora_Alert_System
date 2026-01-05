import apiClient from "./api";

export const submitUserResponse = async (
    userId,
    eventId,
    response,
    description = ""
) => {
    const res = await apiClient.post("/user-responses", null, {
        params: {
            userId,
            eventId,
            response,
            description,
        },
    });
    return res.data;
};
