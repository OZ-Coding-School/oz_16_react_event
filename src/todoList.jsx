import React from "react";
import { useState } from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([
    { id: 0, todo: "밥먹기", isComplete: false },
    { id: 1, todo: "공부하기", isComplete: true },
    { id: 2, todo: "청소하기", isComplete: false },
  ]);

  const toggleCheckbox = (index) => {
    const newArr = [...todoList];
    newArr[index].isComplete = !newArr[index].isComplete;
    setTodoList(newArr);
  };

  return (
    <ul>
      {todoList.map((item, index) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.isComplete}
            onChange={() => toggleCheckbox(index)}
          />
          <span>{item.todo}</span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
