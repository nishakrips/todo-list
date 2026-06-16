function AboutPage() {
  return (
    <div>
      <h1>About Todo App</h1>
      <p>
        This is a simple todo list application built with React.The app allows
        users to manage their tasks by adding, editing, completing, and deleting
        todo items. It also includes features for filtering and sorting tasks,
        as well as user authentication for a personalized experience.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Add new todo items</li>
        <li>Mark todo items as complete</li>
        <li>Edit existing todo items</li>
        <li>Delete todo items</li>
        <li>Filter todo items by status (active, completed, all)</li>
        <li>Sort todo items by title or creation date</li>
        <li>User authentication and protected routes</li>
        <li>Search todo items</li>
      </ul>
      <h2>Technologies Used</h2>
      <ul>
        <li>React</li>
        <li>React Router</li>
        <li>Vite</li>
        <li>CSS Modules</li>
        <li>
          React Hooks useState, useEffect and Reducers for state management
        </li>
        <li>UseMemo for performance optimization with Sort and Filter</li>
        <li>Fetch API for backend communication</li>
        <li>Deployed on Vercel</li>
      </ul>
    </div>
  )
}

export default AboutPage
