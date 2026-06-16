import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect } from "react"

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || "/todos"

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } })
    }
  }, [isAuthenticated, navigate, location])

  return <>{children}</>
}

export default RequireAuth
