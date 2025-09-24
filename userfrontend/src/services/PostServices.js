import axios from "axios";

const API_URL = "http://localhost:4000/posts/";

class PostServices {

    // Create a new post


    // Get all posts
    static async getAllPosts() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    };

    //Get all posts by user id
    static async getPostsByUserId(userId) {
        try {
            const response = await axios.get(`${API_URL}user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching posts by user ID:", error);
            throw error;
        }
    };

        // Create a new post
    static async createPost(formData) {
        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    static async deletePost(postId) {
        try {
            const response = await axios.delete(`${API_URL}${postId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }

    static async getSinglePostById(postId){
        try{
            const response = await axios.get(`${API_URL}${postId}`)
            return response.data;
        }catch(error){
            console.error("Error fetching post:", error);
            throw error;
        }
    }

    static async updatePost(postId, formData) {
        try {
            const response = await axios.patch(`${API_URL}${postId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

}

export default PostServices;


