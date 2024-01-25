import './App.css'
import React, { useEffect, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import ClassesPage from './pages/ClassesPage'
import LoginPage from './pages/LoginPage'
import PageNotFound from './pages/PageNotFound'
import ProfilePage from './pages/ProfilePage'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Authentication from './authentication'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(Authentication.isAuthenticated())
  }, [])

  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            {/*<Route exact path="/" element={<Navigate to={"/login"} />} />*/}
            <Route
              path="/"
              element={
                Authentication.isAuthenticated() ? (
                  <Navigate to="/classes" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  )
}

export default App
