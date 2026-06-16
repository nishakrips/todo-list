import styles from "./App.module.css"
import { Routes, Route } from "react-router"
import Header from "./shared/Header"
import AboutPage from "./pages/AboutPage"
import HomePage from "./pages/HomePage"
import TodosPage from "./pages/TodosPage"
import LoginPage from "./pages/LoginPage"
import RequireAuth from "./components/RequireAuth"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.pageHeader}>
        <Header />
      </header>
      <main className={styles.pageMain}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
