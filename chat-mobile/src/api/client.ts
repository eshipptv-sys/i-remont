import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'
});

export const api = {
  setToken(token: string) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  async requestCode(phone: string) {
    await instance.post('/auth/request-code', { phone });
  },
  async confirmCode(phone: string, code: string) {
    const { data } = await instance.post('/auth/confirm', { phone, code });
    return data;
  },
  async getMe() {
    const { data } = await instance.get('/me');
    return data;
  },
  async updateProfile(payload: { name?: string; status?: string }) {
    const { data } = await instance.put('/me', payload);
    return data;
  },
  async getContacts() {
    const { data } = await instance.get('/contacts');
    return data;
  },
  async getChats() {
    const { data } = await instance.get('/chats');
    return data;
  },
  async createChat(userId: string) {
    const { data } = await instance.post('/chats', { userId });
    return data;
  },
  async getMessages(chatId: string, options?: { offset?: number; limit?: number }) {
    const { data } = await instance.get(`/chats/${chatId}/messages`, { params: options });
    return data;
  },
  async sendMessage(chatId: string, text: string) {
    const { data } = await instance.post(`/chats/${chatId}/messages`, { text });
    return data;
  }
};
