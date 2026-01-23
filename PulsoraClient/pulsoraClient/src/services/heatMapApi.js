import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/disaster-events/heatmap";

export const fetchHeatMapData = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Heatmap API Error:", error);
        return [];
    }
};