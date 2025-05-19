import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { fetchTodos } from './services/api';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetchTodos();
            setTodos(todosFromServer);
        };

        getTodos();
    }, []);

    return (
        <div className="App">
            <h1>Todo List</h1>
            <TodoList todos={todos} />
        </div>
    );
};

export default App;