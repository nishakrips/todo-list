import TodoList from "./TodoList/TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useCallback, useState } from "react"
import { useEffect } from "react"
import SortBy from "../../shared/SortBy.jsx"
import useDebounce from "../../utils/useDebounce.js"
import FilteredInput from "../../shared/FilteredInput.jsx"

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState(null)
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)
  const [userToken, setUserToken] = useState(token)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterTerm, setFilterTerm] = useState("")
  const [dataVersion, setDataVersion] = useState(0)
  const [filterError, setFilterError] = useState("")

  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  const invalidateCache = useCallback(() => {
    // console.log("Invalidating memo cache after todo mutation")
    setDataVersion((prev) => prev + 1)
  }, [])

  const handleFilterChange = (newFilterTerm) => {
    setFilterTerm(newFilterTerm)
  }

  useEffect(() => {
    async function fetchTodos() {
      const paramsObject = {
        sortBy,
        sortDirection,
      }
      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm
      }
      const params = new URLSearchParams(paramsObject)

      setIsTodoListLoading(true)
      try {
        const response = await fetch(`/api/tasks?${params}`, {
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
        setFilterError("")
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "creationDate" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`)
        } else {
          setError(`Error fetching todos: ${error.message}`)
        }
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
  }, [debouncedFilterTerm, sortBy, sortDirection, token])

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
      const respData = await resp.json().catch(() => null)
      if (resp.ok) {
        const saved = respData?.task ?? respData ?? newTodo
        setTodoList((prev) => [...prev, saved])
        invalidateCache()
      }
      // else {
      //   // console.log(resp)
      //   // console.dir(respData)
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleUpdateToDo(newTodo) {
    if (!newTodo?.id) {
      throw new Error("Todo id is required to update")
    }
    const { id } = newTodo
    const payload = {
      title: newTodo.title,
      isCompleted: newTodo.isCompleted,
    }
    const options = {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": `${token}`,
        credentials: "include",
      },
    }
    try {
      const resp = await fetch(`/api/tasks/${encodeURIComponent(id)}`, options)
      const respData = await resp.json().catch(() => null)
      if (resp.ok) {
        const saved = respData?.task ?? newTodo
        setTodoList((prev) => prev.map((t) => (t.id === saved.id ? saved : t)))
        invalidateCache()
      }
      // else {
      //   console.log(resp)
      //   console.dir(respData)
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  function addToDo(todoTitle) {
    const newTodo = {
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
        const updated = { ...todo, isCompleted: true }
        handleUpdateToDo(updated)
        return updated
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  return (
    <div>
      {filterError && filterError.length > 0 && (
        <div>
          <p>{filterError}</p>
          <button onClick={() => setFilterError("")}>Clear Filter Error</button>
          <button
            onClick={() => {
              setFilterTerm("")
              setSortBy("creationDate")
              setSortDirection("desc")
              setFilterError
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
      <div></div>
      <FilteredInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      <TodoForm onAddTodo={addToDo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateToDo}
        dataVersion={dataVersion}
      />
    </div>
  )
}

export default TodosPage
