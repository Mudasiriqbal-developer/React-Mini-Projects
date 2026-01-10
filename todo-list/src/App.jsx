import { TodoList } from "./todo-list";
import { InputBox } from "./components/InputBox";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <TodoList />
        <InputBox />
      </div>
    </>
  );
}

export default App;
