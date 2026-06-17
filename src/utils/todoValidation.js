export function isValidTodoTitle(todoTitle) {
  return todoTitle.trim() !== "" && todoTitle.length <= 100
}
