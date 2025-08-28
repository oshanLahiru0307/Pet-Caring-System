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
router.get('/:appointmentId', getAppointmentById);

//create new appointment
router.post('/', createAppointment);

//delete appointment by id
router.delete('/:appointmentId', deleteAppointment);

//update appointment by id
router.patch('/:appointmentId', updateAppointment);

module.exports = router;