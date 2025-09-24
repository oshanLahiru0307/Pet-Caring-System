import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyAppointment from './pages/MyAppointment';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHomePage from './pages/UserHomePage';
import DoctorHomePage from './pages/DoctorHomePage';
import DoctorPosts from './pages/DoctorPosts'
import UserAllPosts from './pages/UserAllPosts';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostDetail from './pages/PostDetail';
import state from './store/state';
import {App as AntdApp} from "antd";



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
    <AntdApp>
      <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/userhome' element={<UserHomePage />} />
          <Route path='/doctorhome' element={<DoctorHomePage />} />
          <Route path='/myappointment' element={<MyAppointment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/doctorposts' element={<DoctorPosts />} />
          <Route path='/userposts' element={<UserAllPosts />} />
          <Route path='/allposts' element={<UserAllPosts />} />
          <Route  path='/createpost' element={<CreatePost />} />
          <Route  path='/updatepost/:id' element={<UpdatePost />} />
          <Route  path='/post/:id' element={<PostDetail />} />
        </Routes>

      </div>
    </Router>
    </AntdApp>
  );
}

export default App;