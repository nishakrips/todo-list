import { useAuth } from "../contexts/AuthContext.jsx"
import Navigation from "./Navigation.jsx"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header>
      {/* <h1>My Todos</h1> */}
      <Navigation />
    </header>
  )
}

export default Header
