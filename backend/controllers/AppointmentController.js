const AppointmentSchema = require('../models/AppointmentSchema')

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentSchema.find().sort({createdAt: -1});
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAppointmentById = async (req, res) => {
    try {
        appointmentId = req.params;
        const appointment = await AppointmentSchema.findById({_id:appointmentId});
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    }catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const createAppointment = async (req, res)=> {
    try{
        const newAppoinment = await AppointmentSchema.create(req.body);
        res.status(201).json(newAppoinment);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteAppointment = async (req, res)=> {
    try{
        const {appoinmentId} = req.params;
        const deletedAppoinment = await AppointmentSchema.findByIdAndDelete({_id:appoinmentId});
        if(!deletedAppoinment){
            return res.status(404).json({message:"Appoinment not found"});
        }
        res.status(200).json(deletedAppoinment);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateAppointment = async (req, res)=>{
    try{
        const {appointmentId} = req.params;
        const updatedAppointment = await AppointmentSchema.findByIdAndUpdate({_id:appointmentId},{...req.body});
        if(!updatedAppointment){
            return res.status(404).json({message:"Appoinment not found"});
        }
        res.status(200).json(updatedAppointment);
    }catch(error){
        res.status(500).json({message:error.message});  
    }
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    deleteAppointment,
    updateAppointment
}

