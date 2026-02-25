import React from "react";

// props에 onDelete를 추가
function TodoList({ todos, setTodos, onDelete }) {
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
          <div className="ml-auto flex gap-2">
            <button
              className="text-xl px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              title="수정"
            >
              🔄
            </button>
            <button
              className="text-xl  text-white px-2 py-1 rounded hover:bg-red-50 transition-colors"
              // 부모로부터 받은 onDelete를 실행
              onClick={() => onDelete(item.id)}
            >
              ❎
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
