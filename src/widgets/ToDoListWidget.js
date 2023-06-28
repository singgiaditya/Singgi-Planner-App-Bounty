import React, { useState } from 'react';

export default function TodoListWidget() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="todo-list-widget">
      <h3>Todo List</h3>
      <div className="todo-list-input">
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter a task" />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list-container">
        <div className="todo-list-section">
          <h4>Pending</h4>
          <ul className="todo-list">
            {pendingTodos.map((todo) => (
              <li key={todo.id}>
                <span className="todo-text">{todo.text}</span>
                <div className="todo-actions">
                  <button onClick={() => handleToggleTodo(todo.id)}>Complete</button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="todo-list-section">
          <h4>Completed</h4>
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                <span className="todo-text">{todo.text}</span>
                <div className="todo-actions">
                  <button onClick={() => handleToggleTodo(todo.id)}>Undo</button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
