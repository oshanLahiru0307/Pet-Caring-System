import axios from 'axios';

const BASE_URI = 'http://localhost:4000/users';

class UserServices {

    static async getAllUsers(){
        try{
            const response = await axios.get(BASE_URI);
            return response.data;
        }catch(error){
            console.error('error while calling getAllUsers API', error);
            throw error;
        }
    }

    static async getUserById(userId){
        try{
            const response = await axios.get(`${BASE_URI}/${userId}`);
            return response.data;
        }catch(error){
            console.error('error while calling getUserById API', error);
            throw error;
        }
    }
    static async createUser(userData){
        try{
            const response = await axios.post(BASE_URI, userData);
            return response.data;
        }catch(error){
            console.error('error while calling createUser API', error);
            throw error;
        }
    }   

    static async updateUser(userId, userData){
        try{
            const response = await axios.patch(`${BASE_URI}/${userId}`, userData);
            return response.data;
        }catch(error){
            console.error('error while calling updateUser API', error);
            throw error;
        }   
    }
    static async deleteUser(userId){
        try{
            const response = await axios.delete(`${BASE_URI}/${userId}`);
            return response.data;
        }catch(error){
            console.error('error while calling deleteUser API', error);
            throw error;
        }
    }

}

export default UserServices;
