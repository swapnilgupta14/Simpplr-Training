import axios from "axios";

const API_BASE_URL = "http://localhost:3010/api/v1";

export const UserService = {
  getUsers: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/users`);
    return data;
  },

  createUser: async (userData) => {
    const { data } = await axios.post(`${API_BASE_URL}/users/newUser`, userData);
    return data;
  },

  updateUser: async ({ id, userData }) => {
    const { data } = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return data;
  },
};
