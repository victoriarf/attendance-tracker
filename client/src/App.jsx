import './App.css'
import React from "react";
import ClassesPage from "./pages/ClassesPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<ClassesPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Routes>
        </Router>

      </>
  )
}

export default App
