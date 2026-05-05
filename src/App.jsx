import "./App.css"
import TodoList from "./TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useState } from "react"

function App() {
  const [todoList, setTodoList] = useState([])

  function addToDo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
    }
    setTodoList((prev) => [...prev, newTodo])
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addToDo} />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
