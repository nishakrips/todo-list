export const TODO_ACTIONS = {
  //Fetch operations
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  //Add todo operations
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  //Update todo operations
  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  //Complete todo operations
  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  //UI operations
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
  SET_SORT_DIRECTION: "SET_SORT_DIRECTION",
  SET_DATA_VERSION: "SET_DATA_VERSION",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FILTERS: "RESET_FILTERS",
}

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "creationDate",
  sortDirection: "asc",
  filterTerm: "",
  dataVersion: 0,
}

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return { ...state, isTodoListLoading: true, error: "", filterError: "" }
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: action.payload,
        filterError: "",
      }
    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        error: action.payload,
        filterError: `Error filtering/sorting todos: ${action.payload}`,
      }
    case TODO_ACTIONS.ADD_TODO_START:
      return { ...state, todoList: [...state.todoList, action.payload] }
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return { ...state, todoList: [...state.todoList, action.payload] }
    case TODO_ACTIONS.ADD_TODO_ERROR:
      return { ...state, error: action.payload }
    case TODO_ACTIONS.UPDATE_TODO_START: {
      const updatedTodoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      )
      return { ...state, todoList: updatedTodoList }
    }
    case TODO_ACTIONS.UPDATE_TODO_SUCCESS: {
      const updatedTodoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      )
      return { ...state, todoList: updatedTodoList }
    }
    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return { ...state, error: action.payload }
    case TODO_ACTIONS.COMPLETE_TODO_START: {
      const completedTodoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      )
      return { ...state, todoList: completedTodoList }
    }
    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS: {
      const completedTodoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo,
      )
      return { ...state, todoList: completedTodoList }
    }
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return { ...state, error: action.payload }
    case TODO_ACTIONS.SET_FILTER:
      return { ...state, filterTerm: action.payload }
    case TODO_ACTIONS.SET_SORT:
      return { ...state, sortBy: action.payload }
    case TODO_ACTIONS.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.payload }
    case TODO_ACTIONS.SET_DATA_VERSION:
      return { ...state, dataVersion: action.payload }
    case TODO_ACTIONS.CLEAR_ERROR:
      return { ...state, error: "", filterError: "" }
    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: "",
        sortBy: "creationDate",
        sortDirection: "asc",
        filterError: "",
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
