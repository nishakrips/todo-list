import "./App.css"
import { useAuth } from "./contexts/AuthContext.jsx"
import Header from "./shared/Header"
import TodosPage from "./features/Todos/TodosPage"
import Logon from "./features/Logon"

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <Header />
      {isAuthenticated && <TodosPage />}
      {!isAuthenticated && <Logon />}
    </div>
  )
}

export default App
