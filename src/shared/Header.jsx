import { useAuth } from "../contexts/AuthContext.jsx"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      <h1>My Todos</h1>
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </header>
  )
}

export default Header
