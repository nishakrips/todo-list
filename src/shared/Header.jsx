import { useAuth } from "../contexts/AuthContext.jsx"
import Navigation from "./Navigation.jsx"
import styles from "./Header.module.css"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  )
}

export default Header
