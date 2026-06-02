import TodoList from "./TodoList/TodoList.jsx"
import TodoForm from "./TodoForm.jsx"
import { useCallback, useEffect, useReducer, useState } from "react"
import SortBy from "../../shared/SortBy.jsx"
import useDebounce from "../../utils/useDebounce.js"
import FilterInput from "../../shared/FilteredInput.jsx"
import {
  TODO_ACTIONS,
  initialTodoState,
  todoReducer,
} from "../../reducers/todoReducer.js"
import { useAuth } from "../../contexts/AuthContext.jsx"

function TodosPage() {
  const { token } = useAuth()
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
  } = state
  const [dataVersion, setDataVersion] = useState(0)

  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1)
  }, [])

  const handleFilterChange = (newFilterTerm) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: newFilterTerm })
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
  }, [debouncedFilterTerm, sortBy, sortDirection, token, dataVersion])

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
        invalidateCache()
      }
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.ADD_TODO_ERROR, payload: error.message })
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
    try {
      const resp = await fetch(`/api/tasks/${encodeURIComponent(id)}`, options)
      const respData = await resp.json().catch(() => null)
      if (resp.ok) {
        const saved = respData?.task ?? newTodo
        dispatch({
          type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
          payload: saved,
        })
        invalidateCache()
      }
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: error.message,
      })
    }
  }

  function addToDo(todoTitle) {
    const newTodo = {
      title: todoTitle,
      isCompleted: false,
    }
    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: newTodo })
    handleAddToDo(newTodo)
  }

  function updateToDo(editedTodo) {
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: editedTodo,
    })
    handleUpdateToDo(editedTodo)
  }

  function completeTodo(id) {
    const todo = todoList.find((t) => t.id === id)
    if (!todo) return
    const updated = { ...todo, isCompleted: true }
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: updated,
    })
    handleUpdateToDo(updated)
  }

  return (
    <div>
      {filterError && filterError.length > 0 && (
        <div>
          <p>{filterError}</p>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Filter Error
          </button>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}
      <div></div>
      <SortBy
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
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addToDo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateToDo}
        dataVersion={dataVersion}
        isLoading={isTodoListLoading}
        error={error}
      />
    </div>
  )
}

export default TodosPage
