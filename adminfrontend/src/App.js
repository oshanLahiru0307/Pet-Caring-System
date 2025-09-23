import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../src/pages/Login';
import AdminDashboard from "../src/pages/AdminDashboard";
import { App as AntdApp } from "antd";

function App() {
  return (
    <AntdApp>
      <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        </Routes>
      </Router>
    </div>
    </AntdApp>
  );
}

export default App;
