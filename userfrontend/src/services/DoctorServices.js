import axios from 'axios'

const BASE_URI = 'http://localhost:4000/doctors';

class DoctorServices {

    static async getDoctors(){
        try{
            const response = await axios.get(BASE_URI);
            if(!response || response.status !== 200){
                throw new Error('Could not fetch the doctors');
            }
            return response.data;
        }catch(error){
            console.error('Error fetching doctors:', error);
            throw error;
        }
    }


static async getDoctorById(doctorId){
        try{
            const response = await axios.get(`${BASE_URI}/${doctorId}`);
            return response.data;
        }catch(error){
            console.error('error while calling getDoctorById API', error);
            throw error;
        }
    }

    static async createDoctor(doctorData){
        try{
            const response = await axios.post(BASE_URI, doctorData);
            return response.data;
        }catch(error){
            console.error('error while calling createDoctor API', error);
            throw error;
        }

    }   

    static async updateDoctor(doctorId, doctorData){
        try{
            const response = await axios.patch(`${BASE_URI}/${doctorId}`, doctorData);
            return response.data;
        }catch(error){
            console.error('error while calling updateDoctor API', error);
            throw error;
        }   
    }
    
    static async deleteDoctor(doctorId){
        try{
            const response = await axios.delete(`${BASE_URI}/${doctorId}`);
            return response.data;
        }catch(error){
            console.error('error while calling deleteDoctor API', error);
            throw error;
        }
    }



}

export default DoctorServices;