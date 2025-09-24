import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { App } from 'antd';
import PostServices from '../services/PostServices';
import Navbar from '../components/Navbar';

const UpdatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(null);

    const { message } = App.useApp();
    const { id: postId } = useParams();
    const navigate = useNavigate();

    const fetchPost = async (postId) => {
        try {
            console.log("post Id:", postId)
            setLoading(true);
            const response = await PostServices.getSinglePostById(postId);
            console.log("post detail:", response)
            if (response) {
                setTitle(response.title);
                setContent(response.content);
                setCurrentImage(response.imagePath);
            }
        } catch (error) {
            console.error("Failed to fetch post data:", error);
            message.error("Failed to load post data. Please try again.");
            navigate('/allposts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost(postId);
        }
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('imagePath', image);
        }

        try {
            await PostServices.updatePost(postId, formData);
            message.success('Post updated successfully!');
            navigate('/allposts');
        } catch (error) {
            console.error('Failed to update post:', error);
            message.error('Failed to update post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
                <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Update Post</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                                required
                            />
                        </div>

                        {/* Content Field */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows="10"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Image
                            </label>
                            {currentImage && (
                                <div className="mb-4">

                                    <p className="text-xs text-gray-500 mt-2">To change the image, upload a new file below.</p>
                                </div>
                            )}
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-blue-600 text-white font-semibold text-sm rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {loading ? 'Updating...' : 'Update Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;