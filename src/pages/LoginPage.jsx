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
    // ... existing login logic
    const result = await login(email, password)
    if (result.success) {
      // useEffect will handle redirect
    }
  }

  // ... rest of component with form JSX
  return (
    <>
      <p>{authError}</p>
      <form onSubmit={handleSubmit}>
        <TextInputWithLabel
          elementId="email"
          value={email}
          labelText="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
        ></TextInputWithLabel>
        <TextInputWithLabel
          elementId="password"
          value={password}
          labelText="Password"
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        ></TextInputWithLabel>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log on"}
        </button>
      </form>
    </>
  )
}

export default LoginPage
