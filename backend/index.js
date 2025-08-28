require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/UserRoutes');
const DoctorRoutes = require('./routes/DoctorRoutes');
const AppointmentRoutes = require('./routes/AppointmentRoutes');

const app  = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/users', UserRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/appointments', AppointmentRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, ()=>{
        console.log("Server running on port:",process.env.PORT);
    });
})
.catch((error)=> {
    console.error('Error connecting to MongoDB:', error);
})
