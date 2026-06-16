import { useEditableTitle } from "../../../hooks/useEditableTitle.js"
import { isValidTodoTitle } from "../../../utils/todoValidation.js"
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx"
import styles from "./TodoListItem.module.css"

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title)

  // function handleCancel() {
  //   setIsEditing(false)
  //   setWorkingTitle(todo.title)
  // }

  function handleUpdate(evt) {
    if (!isEditing) return
    evt.preventDefault()
    const finalTitle = finishEdit()
    onUpdateTodo({ ...todo, title: finalTitle })
  }

  return (
    <li className={styles.todoItem}>
      <form className={styles.todoItemForm} onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={(evt) => updateTitle(evt.target.value)}
              elementId={todo.id}
              labelText="Todo"
            />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>
              Update
            </button>
          </>
        ) : (
          <>
            <label className={styles.todoCheckbox}>
              <input
                type="checkbox"
                id={`checkbox-${todo.id}`}
                checked={todo.isCompleted}
                onChange={(evt) => onCompleteTodo(todo.id, evt.target.checked)}
              />
            </label>
            <span
              className={styles.todoItemText}
              onClick={() => startEditing()}
            >
              {todo.title}
            </span>
          </>
        )}
      </form>
    </li>
  )
}
export default TodoListItem
