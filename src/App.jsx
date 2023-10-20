import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Nav from './components/Nav';
import Login from './components/Login';



function App() {

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
