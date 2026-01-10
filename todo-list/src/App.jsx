import { TodoList } from "./components/todo-list";
import { Messages } from "./components/Messages";
import { InputBox } from "./components/InputBox";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <TodoList />

      
      <div className="todo-area">
        <Messages />
      </div>

      <InputBox />
    </div>
  );
}

export default App;