import { useState } from "react";

function CeckList() {
  const [todoList, setTodoList] = useState([
    { id: 0, todo: "밥먹기", isComplete: false },
    { id: 1, todo: "공부하기", isComplete: true },
    { id: 2, todo: "청소하기", isComplete: false },
  ]);
  const toggleChackbox = (i) => {
    const newArr = [...todoList];
    newArr[i].isComplete = !newArr[i].isComplete;
    setTodoList(newArr);
  };
  return (
    <>
      {todoList.map((maps, i) => (
        <li key={maps.id}>
          <label>
            <input
              type="checkbox"
              checked={maps.isComplete}
              onChange={() => toggleChackbox(i)}
            />
            {maps.todo}
          </label>
        </li>
      ))}
    </>
  );
}

export default CeckList;
