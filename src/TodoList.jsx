import TodoListItem from "./TodoListItem"

function TodoList({ todoList, onCompleteTodo }) {
  let filteredTodoList = todoList.filter((todo) => !todo.isCompleted)
  return (
    <ul>
      {!filteredTodoList || filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        filteredTodoList.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          )
        })
      )}
    </ul>
  )
}

export default TodoList
