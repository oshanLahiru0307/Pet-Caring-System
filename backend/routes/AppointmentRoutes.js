const express = require('express');
const router = express.Router();
const { 
    getAllAppointments, 
    getAppointmentById, 
    createAppointment, 
    deleteAppointment, 
    updateAppointment } = require('../controllers/AppointmentController');


//get all appointments
router.get('/', getAllAppointments);

//get appointment by id
router.get('/:id', getAppointmentById);

//create new appointment
router.post('/', createAppointment);

//delete appointment by id
router.delete('/:id', deleteAppointment);

//update appointment by id
router.patch('/:id', updateAppointment);

module.exports = router;