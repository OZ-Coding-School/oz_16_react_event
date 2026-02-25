import React from "react";
import { useState, useEffect } from "react";
import TodoInput from "./TodoInput.jsx";
// 파일명 오류(?)때문에 소문자로 해뒀는데, 불러오는 이름은 대문자 TodoList로 해야 리액트가 인식함
import TodoList from "./todoList.jsx";

function Todo() {
  const [todos, setTodos] = useState([]);

  // 삭제 함수 정의: 여기서 id를 받아 필터링
  const handleDeleteButtonClick = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  useEffect(() => {
    console.log("데이터 변경됨:", todos);
  }, [todos]);

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      {/* 1. 입력창 */}
      <TodoInput todos={todos} setTodos={setTodos} />

      {/* 2. 리스트 (삭제 함수를 onDelete라는 이름으로 전달) */}
      <TodoList
        todos={todos}
        setTodos={setTodos}
        onDelete={handleDeleteButtonClick}
      />
    </div>
  );
}

export default Todo;
