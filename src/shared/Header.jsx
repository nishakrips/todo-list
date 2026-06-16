import { useAuth } from "../contexts/AuthContext.jsx"
import Navigation from "./Navigation.jsx"
import styles from "./Header.module.css"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className={styles.header}>
      {/* <h1>My Todos</h1> */}
      <Navigation />
    </header>
  )
}

export default Header
