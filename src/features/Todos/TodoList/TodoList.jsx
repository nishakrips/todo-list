import TodoListItem from "./TodoListItem"

function TodoList({ todoList = [], onCompleteTodo, onUpdateTodo }) {
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
              onUpdateTodo={onUpdateTodo}
            />
          )
        })
      )}
    </ul>
  )
}

export default TodoList
