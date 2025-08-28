const express = require('express');
const router = express.Router();
const { 
    getAllAppointments, 
    getAppointmentById, 
    createNewAppointment, 
    deleteAppointmentById, 
    updateAppointmentById } = require('../controllers/AppointmentController');


//get all appointments
router.get('/', getAllAppointments);

//get appointment by id
router.get('/:appointmentId', getAppointmentById);

//create new appointment
router.post('/', createNewAppointment);

//delete appointment by id
router.delete('/:appointmentId', deleteAppointmentById);

//update appointment by id
router.patch('/:appointmentId', updateAppointmentById);

module.exports = router;