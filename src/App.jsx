import "./App.css"
import TodoList from "./features/TodoList/TodoList.jsx"
import TodoForm from "./features/TodoList/TodoForm.jsx"
import { useState } from "react"

function App() {
  const [todoList, setTodoList] = useState([])

  function addToDo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }
    setTodoList((prev) => [...prev, newTodo])
  }

  function updateToDo(editedTodo) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return editedTodo
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  function completeTodo(id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true }
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addToDo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateToDo}
      />
    </div>
  )
}

export default App
