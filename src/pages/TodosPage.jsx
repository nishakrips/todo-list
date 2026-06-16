import TodoList from "../features/Todos/TodoList/TodoList.jsx"
import TodoForm from "../features/Todos/TodoForm.jsx"
import { useEffect, useMemo, useReducer } from "react"
import Toolbar from "../shared/Toolbar.jsx"
import useDebounce from "../utils/useDebounce.js"
import {
  TODO_ACTIONS,
  initialTodoState,
  todoReducer,
} from "../reducers/todoReducer.js"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useSearchParams } from "react-router"

function TodosPage() {
  const { token } = useAuth()

  const [state, dispatch] = useReducer(todoReducer, initialTodoState)
  const {
    todoList,
    filterError,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state

  // Get status filter from URL, default to 'all'
  const [searchParams] = useSearchParams()
  const statusFilter = searchParams.get("status") || "all"
  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  const handleFilterChange = (newFilterTerm) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: newFilterTerm })
  }

  const sortTodoList = (todos, sortByField, direction) => {
    const normalizedList = Array.isArray(todos) ? [...todos] : []
    const compare = (left, right) => {
      const leftValue = left.title ?? ""
      const rightValue = right.title ?? ""
      if (sortByField === "title") {
        return leftValue.localeCompare(rightValue, undefined, {
          sensitivity: "base",
        })
      }

      const leftDate = Date.parse(left.createdDate || left.creationDate || "")
      const rightDate = Date.parse(
        right.createdDate || right.creationDate || "",
      )
      if (!Number.isFinite(leftDate) && !Number.isFinite(rightDate)) {
        return 0
      }
      if (!Number.isFinite(leftDate)) {
        return 1
      }
      if (!Number.isFinite(rightDate)) {
        return -1
      }
      return leftDate - rightDate
    }

    normalizedList.sort((a, b) => {
      const result = compare(a, b)
      return direction === "desc" ? -result : result
    })
    return normalizedList
  }

  useEffect(() => {
    async function fetchTodos() {
      const paramsObject = {}
      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm
      }
      const params = new URLSearchParams(paramsObject)

      try {
        dispatch({ type: TODO_ACTIONS.FETCH_START })
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
        dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: data.tasks })
      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: error.message,
        })
      }
    }
    fetchTodos()
  }, [debouncedFilterTerm, token, dataVersion])

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
        dispatch({ type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload: saved })
      }
    } catch (error) {
      const retPayload = {
        todoList: state.todoList,
        error: error.message || "Failed to add todo",
      }
      dispatch({ type: TODO_ACTIONS.ADD_TODO_ERROR, payload: retPayload })
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
        credentials: "include",
        "Content-Type": "application/json",
        "X-CSRF-Token": `${token}`,
      },
    }
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: newTodo,
    })
    try {
      const resp = await fetch(`/api/tasks/${encodeURIComponent(id)}`, options)
      const respData = await resp.json().catch(() => null)
      if (resp.ok) {
        const saved = respData?.task ?? newTodo
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
          payload: saved,
        })
      }
    } catch (error) {
      const retPayload = {
        todoList: state.todoList,
        error: error.message || "Failed to update todo",
      }
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_ERROR, payload: retPayload })
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
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: editedTodo,
    })
    handleUpdateToDo(editedTodo)
  }

  function completeTodo(id, isCompleted) {
    const todo = todoList.find((t) => t.id === id)
    if (!todo) return
    const updated = { ...todo, isCompleted }
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: updated,
    })
    handleUpdateToDo(updated)
  }

  const sortedTodoList = useMemo(
    () => sortTodoList(todoList, sortBy, sortDirection),
    [todoList, sortBy, sortDirection],
  )

  return (
    <div>
      {filterError && filterError.length > 0 && (
        <div>
          <p>{filterError}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
            Clear Filter Error
          </button>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}
      <Toolbar
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: newSortBy,
          })
        }
        onSortDirectionChange={(newDirection) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT_DIRECTION,
            payload: newDirection,
          })
        }
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addToDo} />
      <TodoList
        todoList={sortedTodoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateToDo}
        dataVersion={dataVersion}
        statusFilter={statusFilter}
      />
    </div>
  )
}

export default TodosPage
