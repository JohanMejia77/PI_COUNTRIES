import axios from "axios";
const API_ACTIVITIES = 'http://localhost:3001/activity';

export const fetchActivities = async () => {
    try {
        const response = await axios.get(API_ACTIVITIES);
        return response.data;
    } catch (error) {
        return [];
    }
}