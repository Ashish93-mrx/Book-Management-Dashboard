import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const getBooks = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createBook = async (payload) => {
  const res = await api.post("/", payload);
  return res.data;
};

export const updateBook = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
