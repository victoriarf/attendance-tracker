import './App.css'
import React, {useEffect, useState} from "react";
import ClassesPage from "./pages/ClassesPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Authentication from "./authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log(Authentication);
    console.log(Authentication.isAuthenticated());
    setIsAuthenticated(Authentication.isAuthenticated());

  }, []);

  return (
      <>

        {'Authentication:' + isAuthenticated}
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

            <Route path="/classes" element={<ClassesPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </>
  )
}

export default App
