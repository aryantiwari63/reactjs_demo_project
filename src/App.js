import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Home from "./components/Home";
import Myjob from "./components/Myjob";
import Postajob from "./components/Postajob";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Applypage from './components/Applypage';

import { useSelector } from 'react-redux';

function App() {

  const profileData = useSelector((state) => state.profile.profileData);
  return (
    <>
  
    <div className="App">
      <Navbar/>
      <Routes>
    
      <Route path="/" element={<Home/>}/>
        <Route path="/postajob" element={<Postajob/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Applypage/:id" element={<Applypage profiledata={profileData}/>}/>
        <Route path="/Myjob" element={<Myjob profiledata={profileData}/>}/>
      </Routes>
     </div>
    
     </>
  );
}

export default App;
