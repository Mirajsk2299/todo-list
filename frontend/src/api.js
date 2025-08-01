import axios from "axios";


const API = axios.create({ baseURL: "https://todo-list-backend-1f5a.onrender.com/todos" });

export const getTodos = () => API.get("/");
export const addTodo = (text) => API.post("/", { text });
export const updateTodo = (id, updated) => API.put(`/${id}`, updated);
export const deleteTodo = (id) => API.delete(`/${id}`);
