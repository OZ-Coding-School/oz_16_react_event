function CeckList({ todoList, setTodoList }) {
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
