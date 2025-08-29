import axios from 'axios';

const BASE_URI = 'http://localhost:4000/appointments'

class AppointmentServices{

    static async createAppointment(appointmentData){
        try{
            const response = await axios.post(BASE_URI, appointmentData);
            return response.data;
        }catch(error){
            console.error('failed to create appointment', error);
            throw error;
        }
    }

}

export default AppointmentServices;