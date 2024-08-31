import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Container} from "react-bootstrap";
// add pages and components
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
      <Header/>
      <NavBar/>
         <div className="pages">
          <Container>

          
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
        </Container>
      </div>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
