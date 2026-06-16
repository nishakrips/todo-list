import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx"

function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState("")

  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || "/todos"

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setAuthError("")
    const result = await login(email, password)
    setLoading(false)
    if (!result.success) {
      setAuthError(result.error || "Login failed")
    }
    // success redirect handled by useEffect
  }

  return (
    <>
      <p>{authError}</p>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-row">
          <div className="field">
            <TextInputWithLabel
              elementId="email"
              value={email}
              labelText="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="field">
            <TextInputWithLabel
              elementId="password"
              value={password}
              labelText="Password"
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log on"}
        </button>
      </form>
    </>
  )
}

export default LoginPage
