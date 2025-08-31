import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../src/pages/Login';
import AdminDashboard from "../src/pages/AdminDashboard";
import ReceptionDashboard from '../src/pages/ReceptionDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/receptionDashboard' element={<ReceptionDashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
