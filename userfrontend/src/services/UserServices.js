import axios from 'axios';

const BASE_URI = 'http://localhost:4000/users';

class UserServices {

    static async loginUser(userData){
        try {
            const response = await axios.post(`${BASE_URI}/login`, userData);
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    }

    static async registerUser(userData){
        try {
            const response = await axios.post(BASE_URI, userData);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}   

export default UserServices;