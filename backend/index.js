require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app  = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

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
