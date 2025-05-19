import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/api';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        };
        loadTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const addedTodo = await addTodo({ title: newTodo, isCompleted: false });
            setTodos([...todos, addedTodo]);
            setNewTodo('');
        }
    };

    const handleUpdateTodo = async (id, updatedFields) => {
        const updatedTodo = await updateTodo(id, updatedFields);
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <button onClick={() => handleUpdateTodo(todo.id, { isCompleted: !todo.isCompleted })}>
                            {todo.isCompleted ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;