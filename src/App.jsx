import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo.jsx";

// 투두리스트 데이터 관리
function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
