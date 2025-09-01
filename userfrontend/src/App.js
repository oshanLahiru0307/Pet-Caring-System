import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyAppointment from './pages/MyAppointment';
import Login from './pages/Login';
import Register from './pages/Register';
import state from './store/state';

const App = () => {
  useEffect(() => {
    // Check if user is logged in on app initialization
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (userId && userName) {
      state.currentUser = userId;
      state.currentUserName = userName;
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">

        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/myappointment' element={<MyAppointment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;