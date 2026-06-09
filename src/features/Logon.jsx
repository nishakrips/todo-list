import { useState } from "react"
import TextInputWithLabel from "./../shared/TextInputWithLabel"
import { useAuth } from "../contexts/AuthContext.jsx"

function Logon() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setAuthError("")
    const result = await login(email, password)
    if (!result.success) {
      setAuthError(result.error)
    }
    setLoading(false)
  }

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

export default Logon
