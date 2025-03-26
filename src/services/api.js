import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Fetch all lands
export const fetchLands = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/lands`); // ✅ Corrected API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching lands:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Upload land
export const uploadLand = async (landData) => {
  try {
    const response = await axios.post(`${API_URL}/api/lands`, landData);
    return response.data;
  } catch (error) {
    console.error("Error uploading land:", error.response?.data || error.message);
    throw error;
  }
};
