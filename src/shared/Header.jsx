import { useAuth } from "../contexts/AuthContext.jsx"
import Navigation from "./Navigation.jsx"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      <h1>My Todos</h1>
      <Navigation />
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </header>
  )
}

export default Header
