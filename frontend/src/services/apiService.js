import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendNotification = async (message) => {
    const response = await axios.post(`${API_URL}/notify`, { message });
    return response.data;
};

export const fetchNotifications = async () => {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data.data;
};
 
