import { useEffect, useState } from "react";

function ToDoList({ setTodoList, todoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e) => {
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
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          placeholder="투두리스트"
          value={inputValue}
          onChange={handleInputChange}
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
