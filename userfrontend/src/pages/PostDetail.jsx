import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { App } from 'antd';
import PostServices from '../services/PostServices';
import Navbar from '../components/Navbar';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { message } = App.useApp();
    const { id: postId } = useParams();
    const navigate = useNavigate();

    const fetchPost = async (postId) => {
        try {
            setLoading(true);
            const response = await PostServices.getSinglePostById(postId);
            if (response) {
                setPost(response);
                setError(null);
            }
        } catch (error) {
            console.error("Failed to fetch post data:", error);
            setError("Failed to load post data. Please try again.");
            message.error("Failed to load post data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost(postId);
        }
    }, [postId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading post...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div>
                <Navbar />
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
                        <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
                        <button
                            onClick={() => navigate('/allposts')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Back to All Posts
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                {/* Hero Section */}
                <div className="max-w-[1200px] mx-auto px-4 py-12">
                    <div className="relative">
                        <img
                            src={`http://localhost:4000/${post.imagePath}`}
                            alt={post.title}
                            className="w-full h-96 object-cover rounded-t-2xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-2xl"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-white text-lg">
                                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full mr-4">
                                    By {post.userName}
                                </span>
                                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                    {formatDate(post.createdAt)} at {formatTime(post.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-[1200px] mx-auto px-4 py-12">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Article Content */}
                        <div className="p-8 md:p-12">
                            <div className="prose prose-lg max-w-none">
                                <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                                    {post.content}
                                </div>
                            </div>
                        </div>

                        {/* Author Section */}
                        <div className="bg-gray-50 px-8 md:px-12 py-4 border-t">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                                    {post.userName ? post.userName.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                                        {post.userName.toUpperCase()}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        Published on {formatDate(post.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-8 md:px-12 py-6 bg-white border-t">
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                <button
                                    onClick={() => navigate('/allposts')}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Posts
                                </button>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: post.title,
                                                    text: post.content.substring(0, 100) + '...',
                                                    url: window.location.href
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                                message.success('Link copied to clipboard!');
                                            }
                                        }}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
