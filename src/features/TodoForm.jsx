import { useRef, useState } from "react"
import { isValidTodoTitle } from "../utils/todoValidation.js"
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx"

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("")

  const todoTitleRef = useRef()

  const handleAddTodo = (event) => {
    event.preventDefault()
    onAddTodo(workingTodoTitle)
    setWorkingTodoTitle("")
  }
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        value={workingTodoTitle}
        labelText="Todo"
        ref={todoTitleRef}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      ></TextInputWithLabel>
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm
