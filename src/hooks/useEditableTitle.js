import { useState } from "react"

export function useEditableTitle(initialTitle) {
  const [isEditing, setIsEditing] = useState(false)
  const [workingTitle, setWorkingTitle] = useState(initialTitle)

  const startEditing = () => {
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setWorkingTitle(initialTitle)
  }

  const updateTitle = (newTitle) => {
    setWorkingTitle(newTitle)
  }

  const finishEdit = () => {
    const finalTitle = workingTitle
    setIsEditing(false)
    return finalTitle
  }

  return {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  }
}
