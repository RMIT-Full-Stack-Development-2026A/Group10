import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import HomePage from '@/pages/HomePage'
import GamePage from '@/pages/GamePage'
import HistoryPage from '@/pages/HistoryPage'
import { isAuthenticated } from '@/utils/auth'

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

const GuestOnlyRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? '/' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
