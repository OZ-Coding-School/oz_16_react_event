import React from "react";

function TodoList({ todos, setTodos }) {
  const toggleCheckbox = (id) => {
    const newArr = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });

    setTodos(newArr);
  };

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((item) => (
        <li key={item.id} className="flex items-center gap-2 p-2 border-b">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            checked={item.isComplete}
            onChange={() => toggleCheckbox(item.id)}
          />
          <span className={item.isComplete ? "line-through text-gray-400" : ""}>
            {item.todo}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
