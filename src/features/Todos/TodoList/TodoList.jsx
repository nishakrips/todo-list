import TodoListItem from "./TodoListItem"
import { useMemo } from "react"

function TodoList({
  todoList = [],
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
}) {
  let filteredTodoList = useMemo(() => {
    return {
      version: dataVersion,
      todos: todoList.filter((todo) => !todo.isCompleted),
    }
  }, [todoList, dataVersion])
  return (
    <ul>
      {!filteredTodoList || filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        filteredTodoList.todos.map((todo) => {
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
