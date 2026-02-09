import { useEffect, useState } from "react";

function ToDoList({ setTodoList, todoList }) {
  const [inputValue, setInputValue] = useState("");

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitInput = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      { id: todoList.length, todo: inputValue, isComplete: false },
    ]);
  };
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  return (
    <>
      <form onSubmit={submitInput}>
        <input
          type="text"
          placeholder="투두리스트"
          value={inputValue}
          onChange={inputChange}
        />
        <button className="submit-button" type="submit">
          검색
        </button>
      </form>
      <ul>
        {todoList.map((list) => (
          <li key={list.id}>{list.todo}</li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
