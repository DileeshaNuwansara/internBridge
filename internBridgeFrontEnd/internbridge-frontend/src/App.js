import {BrowserRouter, Routes, Route} from 'react-router-dom'

// add pages and components
import NavBar from './components/NavBar';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Contactus from './pages/Contactus';
import Aboutus from './pages/Aboutus';
import Company from './pages/Company';
import Student from './pages/Student';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route 
            path="/"
            element = {<Landing/>}> 
          </Route>
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
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
