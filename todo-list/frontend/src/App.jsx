import { useState, useEffect } from "react";
import axios from "axios";
import { TodoList } from "./todo-list";
import { Messages } from "./components/Messages";
import { InputBox } from "./components/InputBox";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const API_URL = "http://localhost:8000/api/todos";

  // 🔹 Fetch todos from backend on load
  const fetchTodos = async () => {
  try {
    const res = await axios.get(API_URL);

    const formattedTodos = res.data.map((todo) => ({
      id: todo._id,
      text: todo.title,
      completed: todo.completed,
      createdAt: new Date(todo.createdAt).toLocaleTimeString(),
    }));

    setTodos(formattedTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Add new todo (Backend)
  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;

    try {
      const res = await axios.post(API_URL, {
        title: inputValue,
        completed: false,
      });

      const formattedTodo = {
        id: res.data._id,
        text: res.data.title,
        completed: res.data.completed,
        createdAt: new Date(res.data.createdAt).toLocaleTimeString(),
      };

      setTodos([formattedTodo, ...todos]);
      setInputValue("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // 🔹 Delete todo (Backend)
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // 🔹 Toggle todo completion (Backend)
  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);

      const res = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed,
      });

      setTodos(
        todos.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: res.data.completed,
              }
            : t
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // 🔹 Update todo text (Backend)
  const handleUpdateTodo = async (id, newText) => {
    if (newText.trim() === "") {
      handleDeleteTodo(id);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        title: newText,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, text: res.data.title }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // 🔹 Clear all completed todos (Backend)
  const handleClearCompleted = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);

      await Promise.all(
        completedTodos.map((todo) =>
          axios.delete(`${API_URL}/${todo.id}`)
        )
      );

      setTodos(todos.filter((todo) => !todo.completed));
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    }
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