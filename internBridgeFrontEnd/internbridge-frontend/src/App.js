import {BrowserRouter, Routes, Route} from 'react-router-dom'

// add pages and components
import Landing from './pages/Landing';
import Home from './pages/Home';
import NavBar from './components/NavBar';

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
            element = {<Home/>}> 
          </Route>
        

        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
