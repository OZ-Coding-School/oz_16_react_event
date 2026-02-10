import { useState } from "react";
import ToDoList from "./TodoInput";
import CheckList from "./CheckList";
import Filter from "./filter";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, todo: "밥먹기", isComplete: false },
    { id: 1, todo: "공부하기", isComplete: true },
    { id: 2, todo: "청소하기", isComplete: false },
  ]);
  const [selectedFilterId, setSelectedFilterId] = useState(0);

  const getFilteredList = () => {
    if (selectedFilterId === 0) return todoList;
    if (selectedFilterId === 1)
      return todoList.filter((todo) => !todo.isComplete);
    if (selectedFilterId === 2)
      return todoList.filter((todo) => todo.isComplete);
  };

  return (
    <>
      <div className="app">
        <div>
          <h1>ToDoList</h1>

          <CheckList todoList={todoList} setTodoList={setTodoList} />
          <Filter
            selectedFilterId={selectedFilterId}
            setSelectedFilterId={setSelectedFilterId}
          />
          <ToDoList todoList={getFilteredList()} setTodoList={setTodoList} />
        </div>
      </div>
    </>
  );
}

export default App;
