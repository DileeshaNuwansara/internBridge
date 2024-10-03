import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState} from 'react';
// add pages and components
//import Header from './components/Header';

import AppNavbar from './components/AppSideBar/AppSideBar';


import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Contactus from './pages/Contactus/Contactus';
import Aboutus from './pages/Aboutus/Aboutus';
import Company from './pages/Company/Company';
import Student from './pages/Student/Student';

import Signin from './pages/Signin/Signin'
import Register from './pages/Register/Register';
import Testimonials from './pages/Testimonials/Testimonials';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
    
      <BrowserRouter>
      {/* <Header/> */}
      {/* display landingPageNavbar or AppNavbar */}
      {/* {isAuthenticated ? <AppNavbar /> : <Landing />} */}
         
        
        <Routes>
          <Route 
            path="/"
            element = {<Landing/>}> 
          </Route> 
          <Route 
            path="/sign-in"
            element = {<Signin/>} />
            <Route 
            path="/register"
            element = {<Register/>} />
          <Route 
            path="/home"
            element = {<Home/>} />
          <Route
            path="/contact-us"
            element={<Contactus/>} />
            <Route 
            path="/about-us"
            element={<Aboutus/>} />
            <Route
            path="/company"
            element ={<Company/>} />
            <Route
            path="/student"
            element = {<Student/>} />
            <Route
            path="/testimonials"
            element = {<Testimonials/>} />

        </Routes>
        
      
      </BrowserRouter>
      
    </>
  );
};

export default App;
