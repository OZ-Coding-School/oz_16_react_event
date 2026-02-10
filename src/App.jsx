import { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./todoList.jsx";

// 투두리스트 데이터 관리
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <h1>TodoList</h1>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default App;
