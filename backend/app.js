// Necessary libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Dotenv configuration and Express app initialization
require('dotenv').config();
const app = express();

// Import routes
const UserRoutes = require('./routes/User/UserRoutes');
const DoctorRoutes = require('./routes/Doctor/DoctorRoutes');
const AppointmentRoutes = require('./routes/Appointment/AppointmentRoutes');
const PostRoutes = require('./routes/Post/PostRoutes'); // Import the new Post routes

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', UserRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/appointments', AppointmentRoutes);
app.use('/posts', PostRoutes); // Add the new Post routes

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('Server running on port:', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
