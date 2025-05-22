import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todo';

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTodo = async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const reorderTodos = async (todos) => {
    // Assign unique, sequential orderNum to all items in the grouped order
    const orderList = todos.map((todo, idx) => ({
        id: todo.id,
        orderNum: idx
    }));
    await axios.put(`${API_URL}/reorder`, orderList);
};