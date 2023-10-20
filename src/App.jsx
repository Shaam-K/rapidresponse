import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Nav from './components/Nav';
import CreateAcc from './components/CreateAcc';
import CreateDetails from './components/CreateDetails';



function App() {

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<CreateAcc/>}></Route>
        <Route path="/create" element={<CreateDetails/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
