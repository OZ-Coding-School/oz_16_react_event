import { useState } from "react";
import ToDoList from "./TodoInput";
import CeckList from "./CeckList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, todo: "밥먹기", isComplete: false },
    { id: 1, todo: "공부하기", isComplete: true },
    { id: 2, todo: "청소하기", isComplete: false },
  ]);

  return (
    <>
      <div className="app">
        <div>
          <h1>ToDoList</h1>
          <CeckList todoList={todoList} setTodoList={setTodoList} />
          <ToDoList todoList={todoList} setTodoList={setTodoList} />
        </div>
      </div>
    </>
  );
}

export default App;
