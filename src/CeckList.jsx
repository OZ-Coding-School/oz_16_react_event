import { useState } from "react";

function CeckList({ todoList, setTodoList }) {
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const toggleChackbox = (id) => {
    const newArr = todoList.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item,
    );
    setTodoList(newArr);
  };

  const handleDeleteButtonClick = (id) => {
    const newArr = todoList.filter((item) => item.id !== id);
    setTodoList(newArr);
  };

  const handleEditButtonClick = (id, todo) => {
    if (editingId !== null) {
      const newArr = todoList.map((item) =>
        item.id === editingId ? { ...item, todo: editInput } : item,
      );
      setTodoList(newArr);
      setEditingId(null);
      setEditInput("");
    } else {
      setEditingId(id);
      setEditInput(todo);
    }
  };

  return (
    <ul>
      {todoList.map((maps) => (
        <li key={maps.id}>
          <label>
            <input
              type="checkbox"
              checked={maps.isComplete}
              onChange={() => toggleChackbox(maps.id)}
            />
            {editingId === maps.id ? (
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              maps.todo
            )}
            <button
              className="delete-button"
              onClick={() => handleDeleteButtonClick(maps.id)}
            >
              삭제
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditButtonClick(maps.id, maps.todo)}
            >
              {editingId === maps.id ? "저장" : "수정"}
            </button>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CeckList;
