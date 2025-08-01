import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/todos" });

export const getTodos = () => API.get("/");
export const addTodo = (text) => API.post("/", { text });
export const updateTodo = (id, updated) => API.put(`/${id}`, updated);
export const deleteTodo = (id) => API.delete(`/${id}`);
      