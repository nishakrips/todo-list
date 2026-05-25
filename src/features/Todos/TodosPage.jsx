import TodoList from "./TodoList/TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useState } from "react"
import { useEffect } from "react"

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState(null)
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)
  const [userToken, setUserToken] = useState(token)

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true)
      try {
        const response = await fetch("/api/tasks", {
          headers: {
            credentials: "include",
            "X-CSRF-Token": `${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch todo list")
        }
        const data = await response.json()
        setTodoList(data.tasks)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
  }, [token])

  async function handleAddToDo(newTodo) {
    const options = {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        credentials: "include",
        "Content-Type": "application/json",
        "X-CSRF-Token": `${token}`,
      },
    }
    try {
      const resp = await fetch("/api/tasks", options)
      setTodoList((prev) => [...prev, newTodo])
      if (!resp.ok) {
        console.log(resp)
        const failData = await resp.json()
        console.dir(failData)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleUpdateToDo(newTodo) {
    const options = {
      method: "PATCH",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": `${token}`,
      },
    }
    try {
      const resp = await fetch("/api/tasks", options)
      setTodoList((prev) => [...prev, newTodo])
      if (!resp.ok) {
        console.log(resp)
        const failData = await resp.json()
        console.dir(failData)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  function addToDo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }
    handleAddToDo(newTodo)
  }

  function updateToDo(editedTodo) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        handleUpdateToDo(editedTodo)
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
      handleUpdateToDo(todo)
      return todo
    })
    setTodoList(updatedTodoList)
  }

  return (
    <div>
      {/* <h1>My Todos</h1> */}
      <TodoForm onAddTodo={addToDo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateToDo}
      />
    </div>
  )
}

export default TodosPage
