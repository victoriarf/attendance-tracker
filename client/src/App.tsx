import './App.css';
import React, { lazy, StrictMode, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import ClassesPage from './pages/ClassesPage.jsx';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import Loading from './components/Loading';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DemoPage = lazy(() => import('./pages/Demo/DemoPage'));

function App() {
  return (
    <>
      <StrictMode>
        <ErrorBoundary fallback="Error Fallback">
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<ClassesPage />}></Route>
                <Route path="/classes" element={<ClassesPage />}></Route>
              </Route>

              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProfilePage />{' '}
                  </Suspense>
                }
              />
              <Route
                path="/demo"
                element={
                  <Suspense fallback={<Loading />}>
                    <DemoPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>
    </>
  );
}

export default App;
