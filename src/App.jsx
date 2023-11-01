import './App.css'
import { Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Nav from './components/Nav';
import CreateAcc from './components/CreateAcc';
import CreateDetails from './components/CreateDetails';
import Record from './components/Record';
import Edit from './components/Edit';
import Delete from './components/Delete';

import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';


function App() {

  return (
    <>
      <AuthContextProvider>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<CreateAcc/>}  />
          <Route path="/create" element={
          <Protected>
              <CreateDetails/>
          </Protected>
          
          } />
          <Route path="/record/:recordId" element={<Record/>} />
          <Route path="/edit/:recordId" element={
          <Protected>
            <Edit/>
          </Protected>
          } />
          <Route path="/delete/:recordId" element={
          <Protected>
            <Delete/>
          </Protected>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
