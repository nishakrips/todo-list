import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect, useState } from "react"
import { TODO_ACTIONS } from "../reducers/todoReducer.js"

function ProfilePage() {
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { token, user } = useAuth()

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return

      try {
        setIsLoading(true)
        setError("")

        const options = {
          headers: {
            credentials: "include",
            "X-CSRF-Token": `${token}`,
          },
        }
        const response = await fetch(`/api/tasks`, options)
        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.")
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todo list")
        }
        const todoTasks = await response.json()
        const todos = todoTasks.tasks

        const total = todos.length
        const completed = todos.filter((todo) => todo.isCompleted).length
        const active = total - completed
        setTodoStats({ total, completed, active })
      } catch (error) {
        setError(`Error loading statistics: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTodoStats()
  }, [token])

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the user profile page.</p>
      <h2>Todo Statistics</h2>
      {isLoading ? (
        <p>Loading statistics...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          <li>Total Todos: {todoStats.total}</li>
          <li>Completed Todos: {todoStats.completed}</li>
          <li>Active Todos: {todoStats.active}</li>
        </ul>
      )}
    </div>
  )
}

export default ProfilePage
