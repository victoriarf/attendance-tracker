import React, { lazy, ReactNode, StrictMode, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import ClassesPage from './pages/ClassesPage.jsx';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import Loading from './components/Loading';
import StudentsPage from './pages/StudentsPage';

import './App.css';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DemoPage = lazy(() => import('./pages/Demo/DemoPage'));

const DebugRouter = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`
    );
  }

  return children;
};

function App() {
  return (
    <>
      <StrictMode>
        <ErrorBoundary fallback="Error Fallback">
          <BrowserRouter>
            <DebugRouter>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<ClassesPage />}></Route>
                  <Route path="/classes" element={<ClassesPage />}></Route>
                  <Route path="/students" element={<StudentsPage />}></Route>
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
            </DebugRouter>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>
    </>
  );
}

export default App;
