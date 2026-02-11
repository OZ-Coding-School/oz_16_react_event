import React from "react";
import { useState, useEffect } from "react";

function TodoInput({ setTodos, todos }) {
  const [inputValue, setInputValue] = useState("");
  const newArr = [
    ...todos,
    { id: todos.length, todo: inputValue, isComplete: false },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() === "") return;

    setTodos(newArr);

    setInputValue("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAddClick}>등록</button>
    </div>
  );
}

export default TodoInput;
