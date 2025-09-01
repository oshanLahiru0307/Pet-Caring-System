import axios from 'axios';

const BASE_URI = 'http://localhost:4000/appointments';


class AppointmentsServices {

    static async getAllAppointments() {
        try {
            const response = await axios.get(`${BASE_URI}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    }

    static async createAppointment(appointmentData) {
        try {
            const response = await axios.post(BASE_URI, appointmentData);
            return response.data;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }

    static async updateAppointment(appointmentId, updatedData) {
        try {
            console.log(appointmentId)
            const response = await axios.patch(`${BASE_URI}/${appointmentId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw error;
        }
    }

    static async deleteAppointment(appointmentId) {
        try {
            const response = await axios.delete(`${BASE_URI}/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw error;
        }
    }

    static async getAppointmentById(appointmentId) {
        try {
            const response = await axios.get(`${BASE_URI}/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointment by ID:', error);
            throw error;
        }
    }

    static async getAppointmentByStatus(status){
        try {
            const response = await axios.get(`${BASE_URI}/status/${status}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointment by status:', error);
            throw error;
        }
    }



}

export default AppointmentsServices;