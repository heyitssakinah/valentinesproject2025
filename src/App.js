import './App.css';
import { useState, useEffect } from 'react';
import { getDatabase, get, ref } from 'firebase/database';
import app from './configuration';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CreateFlower } from './pages/CreateFlower';
import Login from './pages/Login';
import {Home} from './pages/Home';
import { useLayoutEffect } from 'react';
import Bouquet from './pages/Bouquet';
import Card from './pages/Card';
function App() {

  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      // Scroll to the top of the page when the route changes
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
  
    return children;
  };

  return (
    <Router>
      <Wrapper>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/Bouquet/:NameWithID" element={<Bouquet/>} />
        <Route path="/Bouquet/:NameWithID/:Sender" element={<Card />} />
        <Route path="/createFlower/:NameWithID" element={<CreateFlower/>} />
        <Route path="*" element={<div>Route Not Found</div>} />
      </Routes>
      </Wrapper>
    </Router>
  );
}


export default App;