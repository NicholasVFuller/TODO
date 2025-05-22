import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo, reorderTodos } from '../services/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const normalizeTodo = (todo) => ({
    ...todo,
    name: todo.name ?? todo.title,
    isComplete: todo.isComplete ?? todo.iscomplete,
    completedAt: todo.completedAt
});

const normalizeTodos = (todos) => todos.map(normalizeTodo);

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            const fetchedTodos = await getTodos();
            setTodos(normalizeTodos(fetchedTodos));
        };
        loadTodos();
    }, []);

    const persistOrder = async (orderedTodos) => {
        // Always persist the full grouped order
        const unchecked = orderedTodos.filter(t => !t.isComplete);
        const checked = orderedTodos.filter(t => t.isComplete);
        const newTodos = [...unchecked, ...checked];
        await reorderTodos(newTodos);
    };

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const addedTodo = await addTodo({ name: newTodo, isComplete: false });
            const updatedTodos = [...todos, normalizeTodo(addedTodo)];
            setTodos(updatedTodos);
            await persistOrder(updatedTodos);
            setNewTodo('');
        }
    };

    const handleUpdateTodo = async (id, updatedFields) => {
        const todoToUpdate = todos.find(t => t.id === id);
        if (!todoToUpdate) return;

        let updatedTodo = {
            ...todoToUpdate,
            ...updatedFields
        };

        if (updatedFields.isComplete && !todoToUpdate.isComplete) {
            updatedTodo.completedAt = Date.now();
        }
        if (!updatedFields.isComplete && todoToUpdate.isComplete) {
            updatedTodo.completedAt = undefined;
        }

        // 1. Update the todo on the backend
        await updateTodo(id, updatedTodo);

        // 2. Fetch the latest todos from the backend (to get the true state)
        const fetchedTodos = await getTodos();
        const normalizedTodos = normalizeTodos(fetchedTodos);

        // 3. Remove the toggled todo from the list
        let otherTodos = normalizedTodos.filter(t => t.id !== id);
        let toggledTodo = normalizedTodos.find(t => t.id === id);

        // 4. Rebuild groups and add the toggled todo to the end of its new group
        let unchecked = otherTodos.filter(t => !t.isComplete);
        let checked = otherTodos.filter(t => t.isComplete);

        if (toggledTodo.isComplete) {
            checked = [...checked, toggledTodo];
        } else {
            unchecked = [...unchecked, toggledTodo];
        }

        const updatedTodos = [...unchecked, ...checked];
        setTodos(updatedTodos);

        // 5. Persist the new order
        await persistOrder(updatedTodos);
    };

    const handleDeleteTodo = async (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        await deleteTodo(id);
        await persistOrder(updatedTodos);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) {
            // Drag was cancelled or dropped outside a droppable area
            // Reload the true order from the backend to prevent UI drift
            const fetchedTodos = await getTodos();
            setTodos(normalizeTodos(fetchedTodos));
            return;
        }

        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) return;

        // Split todos into groups
        const unchecked = todos.filter(t => !t.isComplete);
        const checked = todos.filter(t => t.isComplete);

        let groupTodos, otherTodos, groupName;
        if (source.droppableId === 'unchecked') {
            groupTodos = Array.from(unchecked);
            otherTodos = checked;
            groupName = 'unchecked';
        } else {
            groupTodos = Array.from(checked);
            otherTodos = unchecked;
            groupName = 'checked';
        }

        // Reorder within the group
        const [removed] = groupTodos.splice(source.index, 1);
        groupTodos.splice(destination.index, 0, removed);

        // Merge back into the main todos array in grouped order
        let newTodos;
        if (groupName === 'unchecked') {
            newTodos = [...groupTodos, ...otherTodos];
        } else {
            newTodos = [...otherTodos, ...groupTodos];
        }
        setTodos(newTodos);
        await reorderTodos(newTodos);
    };

    // Split todos for rendering
    const unchecked = todos.filter(t => !t.isComplete);
    const checked = todos.filter(t => t.isComplete);

    return (
        <div>
            <div className="input-row">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                {newTodo.trim() && (
                    <button
                        className="add-todo-button"
                        onClick={handleAddTodo}
                        aria-label="Add"
                        title="Add"
                    >
                        ➕
                    </button>
                )}
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="unchecked">
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {unchecked.map((todo, idx) => (
                                <Draggable key={todo.id} draggableId={`unchecked-${todo.id}`} index={idx}>
                                    {(provided) => (
                                        <li
                                            className="todo-list-item"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={todo.isComplete}
                                                onChange={() => handleUpdateTodo(todo.id, { isComplete: !todo.isComplete })}
                                                aria-label={todo.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <span
                                                className="todo-item-text"
                                                style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}
                                            >
                                                {todo.name}
                                            </span>
                                            <button
                                                className="todo-item-button"
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                aria-label="Delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <Droppable droppableId="checked">
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {checked.map((todo, idx) => (
                                <Draggable key={todo.id} draggableId={`checked-${todo.id}`} index={idx}>
                                    {(provided) => (
                                        <li
                                            className="todo-list-item"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={todo.isComplete}
                                                onChange={() => handleUpdateTodo(todo.id, { isComplete: !todo.isComplete })}
                                                aria-label={todo.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <span
                                                className="todo-item-text"
                                                style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}
                                            >
                                                {todo.name}
                                            </span>
                                            <button
                                                className="todo-item-button"
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                aria-label="Delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TodoList;