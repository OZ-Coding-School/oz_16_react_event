import React from "react";
import { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./todoList.jsx";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("데이터 변경됨:", todos);
  }, [todos]);

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      {/* 1. 입력창이 위로! */}
      <TodoInput todos={todos} setTodos={setTodos} />

      {/* 2. 리스트가 아래로! */}
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Todo;
