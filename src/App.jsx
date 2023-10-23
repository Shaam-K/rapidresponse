import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Nav from './components/Nav';
import CreateAcc from './components/CreateAcc';
import CreateDetails from './components/CreateDetails';
import Record from './components/Record';
import Edit from './components/Edit';
import Delete from './components/Delete';




function App() {

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<CreateAcc/>}></Route>
        <Route path="/create" element={<CreateDetails/>}></Route>
        <Route path="/record/:recordId" element={<Record/>}></Route>
        <Route path="/edit/:recordId" element={<Edit/>}></Route>
        <Route path="/delete/:recordId" element={<Delete/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
