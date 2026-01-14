import { useState } from "react";
import { TodoList } from "./todo-list";
import { Messages } from "./components/Messages";
import { InputBox } from "./components/InputBox";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add new todo
  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleTimeString(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle todo completion
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Update todo text
  const handleUpdateTodo = (id, newText) => {
    if (newText.trim() === "") {
      handleDeleteTodo(id);
      return;
    }

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // Clear all completed todos
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app-container">
      <TodoList todosCount={todos.length} />

      <div className="todo-wrapper">
        <div className="todo-content">
          <div className="todo-area">
            <Messages
              todos={todos}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
            />
          </div>

          <InputBox
            value={inputValue}
            onChange={setInputValue}
            onAdd={handleAddTodo}
            onClearCompleted={handleClearCompleted}
            hasCompletedTodos={todos.some((todo) => todo.completed)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;