import apiClient from "./api";
export const getAllEvents = async () => {
  try {
    const response = await apiClient.get("/api/v1/disaster-events/");
    console.log("API Response Data : ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error encountered while fetching data", error);
    return [];
  }
};
