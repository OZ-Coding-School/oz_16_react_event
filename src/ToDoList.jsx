import { useState } from "react";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitInput = () => {
    e.preventDefault();
    setTodoList([...todoList, inputValue]);
  };
  return (
    <>
      <form onSubmit={submitInput}>
        <input
          type="text"
          placeholder="투두리스트"
          value={inputValue}
          onChange={inputChange}
        />
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default ToDoList;
