import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"
import styles from "./Navigation.module.css"

function Navigation() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout(event) {
    event.preventDefault()
    await logout()
    navigate("/login", { replace: true })
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/todos" style={navLinkStyle}>
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={navLinkStyle}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" style={navLinkStyle} onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

function navLinkStyle({ isActive }) {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  }
}

export default Navigation
