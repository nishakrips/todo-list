import { useEditableTitle } from "../../hooks/useEditbleTitle.js"
import TextInputWithLabel from "../../shared/TextInputWithLabel"

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
    <li>
      <form>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={(evt) => updateTitle(evt.target.value)} />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox-${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  )
}
export default TodoListItem
