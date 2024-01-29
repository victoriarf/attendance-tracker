import './App.css';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import ErrorBoundary from './ErrorBoundary';
import ClassesPage from './pages/ClassesPage.jsx';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  const { userValue } = useContext(AuthContext);

  return (
    <>
      <ErrorBoundary fallback="Error Fallback">
        <Router>
          <Routes>
            {/*<Route exact path="/" element={<Navigate to={"/login"} />} />*/}
            <Route
              path="/"
              element={userValue ? <Navigate to="/classes" /> : <Navigate to="/login" />}
            />

            <Route
              path="/classes"
              element={userValue ? <ClassesPage /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
