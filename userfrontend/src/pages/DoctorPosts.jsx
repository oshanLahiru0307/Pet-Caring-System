import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostServices from '../services/PostServices';
import state from '../store/state';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu, message, Modal } from 'antd'; // 💡 Import Modal from antd
import { EllipsisOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';

const AllPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectPost, setselectPost] = useState(null); 
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const userId = snap.currentUser

  const fetchPosts = async (userId) => {
    setLoading(true);
    try {
      const data = await PostServices.getPostsByUserId(userId);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch posts. Please check your server.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts(userId);
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // 💡 Handle menu item clicks
  const handleMenuClick = (postId, action) => {
    if (action === 'update') {
      navigate(`/updatepost/${postId}`);
    } else if (action === 'delete') {
      setselectPost(postId); // Set the post ID to be deleted
      setIsModalVisible(true); // Show the modal
    }
  };

  // 💡 Handle modal confirmation
  const handleDeleteConfirm = async () => {
    if (selectPost) {
      try {
        console.log("Deleting post with ID:", selectPost);
        await PostServices.deletePost(selectPost);
        message.success("Post deleted successfully.");
        fetchPosts(userId);
      } catch (err) {
        setError("Failed to delete the post.");
        message.error("Failed to delete the post. Please try again.");
      } finally {
        setLoading(false);
        setIsModalVisible(false);
        setselectPost(null);
      }
    }
  };

  // 💡 Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    setselectPost(null);
  };

  const renderMenu = (postId) => (
    <Menu onClick={({ key }) => handleMenuClick(postId, key)}>
      <Menu.Item key="update">Update</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <div className="flex justify-end mb-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
              onClick={() => navigate('/createpost')}
            >
              + New Post
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 w-full col-span-full">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-500 w-full col-span-full">{error}</p>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map(post => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative"
                >
                  <Dropdown overlay={renderMenu(post._id)} trigger={['click']}>
                    <p
                      className="absolute top-2 right-2 p-1 text-gray-700 hover:text-gray-900 z-10 cursor-pointer"
                      onClick={e => e.preventDefault()}
                    >
                      <EllipsisOutlined style={{ fontSize: '28px' }} />
                    </p>
                  </Dropdown>

                  <img
                    src={`http://localhost:4000/${post.imagePath}`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h1 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h1>
                    <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <p>Author: {post.userName}</p>
                      <p>Date: {formatDate(post.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/post/${post._id}`)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      View Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 w-full col-span-full">No posts to display yet.</p>
          )}
        </div>
      </div>

      {/* 💡 The Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }} // 💡 Add a red color to the delete button
      >
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default AllPosts;