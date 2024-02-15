import './App.css';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ClassesPage from './pages/ClassesPage.jsx';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { DemoPage } from './pages/Demo/DemoPage';
import ProtectedRoutes from './protectedRoutes';

function App() {
  return (
    <>
      <ErrorBoundary fallback="Error Fallback">
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<ClassesPage />}></Route>
              <Route path="/classes" element={<ClassesPage />}></Route>
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
