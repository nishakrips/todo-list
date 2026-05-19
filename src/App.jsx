import "./App.css"
import { useState } from "react"
import Header from "./shared/Header"
import TodosPage from "./features/Todos/TodosPage"
import Logon from "./features/Logon"

function App() {
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")

  return (
    <div>
      <Header />
      {token && <TodosPage token={token} />}
      {!token && <Logon onSetEmail={setEmail} onSetToken={setToken} />}
    </div>
  )
}

export default App
