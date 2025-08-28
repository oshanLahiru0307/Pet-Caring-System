const express = require('express');
const router = express.Router();

const { 
    getAllDoctors, 
    getDoctorById, 
    createNewDoctor, 
    deleteDoctorById, 
    updateDoctorById } = require('../controllers/DoctorController');


//get all doctors
router.get('/', getAllDoctors);

//get doctor by id
router.get('/:doctorId', getDoctorById);

//create new doctor
router.post('/', createNewDoctor);

//delete doctor by id
router.delete('/:doctorId', deleteDoctorById);

//update doctor by id
router.put('/:doctorId', updateDoctorById);

module.exports = router;

