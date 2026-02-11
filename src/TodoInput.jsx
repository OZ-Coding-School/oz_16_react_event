import React from "react";
import { useState } from "react";

function generateId() {
  return `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function TodoInput({ setTodos, todos }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: generateId(),
      todo: inputValue,
      isComplete: false,
    };

    setTodos([...todos, newTodo]);

    setInputValue("");
  };

  return (
    <div className="flex gap-2 p-4 bg-white rounded-t-lg shadow-sm">
      <input
        className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleAddClick}
      >
        등록
      </button>
    </div>
  );
}

export default TodoInput;
