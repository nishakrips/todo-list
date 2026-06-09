import { NavLink } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"

function Navigation() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav>
      <ul>
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
              <button onClick={logout}>Logout</button>
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
