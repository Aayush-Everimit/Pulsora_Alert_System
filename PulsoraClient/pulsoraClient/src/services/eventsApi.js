import apiClient from "./api";

export const getAllEvents = async () => {
    try {
        const res = await apiClient.get("/api/v1/disaster-events");
        return res.data;
    } catch (err) {
        console.error("Error encountered while fetching data", err);
        return [];
    }
};
