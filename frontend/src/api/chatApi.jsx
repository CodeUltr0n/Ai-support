import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export async function sendMessage(message,email) {
    const response = await axios.post(`${BASE_URL}/chat/messages`,{
        message,
        email,
    });
    return response.data;
}

export async function getAllConversation() {
    const response = await axios.get(`${BASE_URL}/chat/conversations`);
    return response.data;
}

export async function getConversationById(id) {
    const response  = await axios.get(`${BASE_URL}/chat/conversations/${id}`);
    return response.data;
}
