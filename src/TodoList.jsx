import TodoListItem from "./TodoListItem"

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem todo={todo} />
      })}
    </ul>
  )
}

export default TodoList
