import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { getTodos } from './services/api';

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const loadTodos = async () => {
            const todosFromServer = await getTodos();
            setTodos(todosFromServer);
        };

        loadTodos();
    }, []);

    return (
        <div className="App">
            <h1>//TODO:</h1>
            <TodoList todos={todos} />
        </div>
    );
};

export default App;