import "./App.css"
import TodoList from "./TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useState } from "react"

const todos = [
  { id: 1, title: "review resources" },
  { id: 2, title: "take notes" },
  { id: 3, title: "code out app" },
]

function App() {
  const [todoList, setTodoList] = useState(todos)

  function addToDo(newTodo) {
    setTodoList([...todoList, newTodo])
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm addToDo={addToDo} />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
