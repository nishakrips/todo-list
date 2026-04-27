function TodoForm({ addToDo }) {
  return (
    <form>
      <label htmlFor="todoTitle">Todo </label>
      <input type="text" id="todoTitle" />
      <button type="submit" disabled onClick={addToDo}>
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm
