import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Avatar, notification } from 'antd';
import { MessageOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import state from '../store/state'; // Assuming this is your Valtio store
import { useSnapshot } from 'valtio';

const FloatingChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const snap = useSnapshot(state);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize Socket.IO connection
    useEffect(() => {
        if (snap.currentUser) {
            const newSocket = io('http://localhost:4000');

            newSocket.on('connect', () => {
                setIsConnected(true);
                console.log('Connected to chat server');
                // Register the user with the server
                newSocket.emit('registerUser', {
                    id: snap.currentUser,
                    name: snap.currentUserName,
                    role: snap.currentUserRole
                });
            });

            newSocket.on('disconnect', () => {
                setIsConnected(false);
                console.log('Disconnected from chat server');
            });

            // Listen for the list of all users from the server
            newSocket.on('allUsers', (users) => {
                setUserList(users);
            });

            newSocket.on('message', (data) => {
                setMessages(prev => [...prev, data]);
            });

            newSocket.on('messageHistory', (history) => {
                setMessages(history);
            });

            // New message notification listener
            newSocket.on('newMessageNotification', (data) => {
                const sender = userList.find(u => u.id === data.sender);
                if (sender && snap.activeChatPartnerId !== data.sender) {
                    notification.info({
                        message: `New Message from ${sender.name}`,
                        description: 'Click here to open the chat.',
                        onClick: () => {
                            state.activeChatPartnerId = data.sender;
                            state.activeChatPartnerName = sender.name;
                            setIsOpen(true);
                        },
                    });
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [snap.currentUser, snap.currentUserName, snap.currentUserRole, snap.activeChatPartnerId]);

    // Filter users based on the current user's role
    useEffect(() => {
        if (snap.currentUserRole === 'user') {
            setFilteredUsers(userList.filter(user => user.role === 'doctor' && user.id !== snap.currentUser));
        } else if (snap.currentUserRole === 'doctor') {
            setFilteredUsers(userList.filter(user => user.role === 'user' && user.id !== snap.currentUser));
        }
    }, [userList, snap.currentUserRole, snap.currentUser]);

    // Join chat room when opening chat or changing chat partner
    useEffect(() => {
        if (isOpen && socket && snap.currentUser && snap.activeChatPartnerId) {
            socket.emit('joinConversation', {
                sender: snap.currentUser,
                receiver: snap.activeChatPartnerId
            });
        }
    }, [isOpen, socket, snap.currentUser, snap.activeChatPartnerId]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !socket || !snap.currentUser || !snap.activeChatPartnerId){
            console.log("Failed to send message: missing data");
            return;
        } 

        const messageData = {
            sender: snap.currentUser,
            receiver: snap.activeChatPartnerId,
            senderRole: snap.currentUserRole,
            message: newMessage.trim()
        };

        socket.emit('sendMessage', messageData);
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectUser = (user) => {
        // Update the global state with the new chat partner
        state.activeChatPartnerId = user._id;
        state.activeChatPartnerName = user.name;
        // The useEffect will handle emitting the 'joinConversation' event
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<MessageOutlined />}
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-50 shadow-lg"
                style={{ width: 60, height: 60, backgroundColor: '#1890ff', border: 'none' }}
            />

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 animate-slide-up">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>
                                {snap.activeChatPartnerName?.charAt(0) || '?'}
                            </Avatar>
                            <div className="ml-3">
                                <div className="font-semibold text-sm">{snap.activeChatPartnerName || 'Chat'}</div>
                                <div className="text-xs opacity-90">{isConnected ? 'Online' : 'Offline'}</div>
                            </div>
                        </div>
                        <Button type="text" icon={<CloseOutlined />} onClick={toggleChat} className="text-white" />
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                        {(!snap.activeChatPartnerId) ? (
                            <div className="text-center text-gray-500 text-sm py-8">Select someone to chat with</div>
                        ) : messages.length === 0 ? (
                            <div className="text-center text-gray-500 text-sm py-8">No messages yet</div>
                        ) : (
                            messages.map((msg, index) => {
                                const isOwn = msg.sender === snap.currentUser;
                                return (
                                    <div key={index} className={`mb-3 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs px-3 py-2 rounded-lg ${isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>
                                            <div className="text-sm">{msg.message}</div>
                                            <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>{formatTime(msg.createdAt || msg.timestamp)}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-white rounded-b-lg">
                        <div className="flex items-center space-x-2">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1"
                                disabled={!isConnected || !snap.activeChatPartnerId}
                            />
                            <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} disabled={!newMessage.trim() || !isConnected || !snap.activeChatPartnerId} />
                        </div>
                        {!isConnected && <div className="text-xs text-red-500 mt-2 text-center">Connection lost...</div>}
                    </div>
                </div>
            )}
            
            {/* User List Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-96 z-40 w-60 bg-white rounded-lg shadow-2xl border border-gray-200 animate-slide-up overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div className="bg-gray-200 text-gray-800 p-3 rounded-t-lg font-semibold">
                        {snap.currentUserRole === 'user' ? 'Available Doctors' : 'Users'}
                    </div>
                    <ul>
                        {filteredUsers.length === 0 ? (
                            <li className="p-3 text-center text-gray-500 text-sm">No one is online.</li>
                        ) : (
                            filteredUsers.map(user => (
                                <li key={user.id} 
                                    className={`p-3 border-b cursor-pointer hover:bg-gray-100 flex items-center space-x-2 ${snap.activeChatPartnerId === user.id ? 'bg-blue-100' : ''}`} 
                                    onClick={() => handleSelectUser(user)}>
                                    <Avatar size="small" style={{ backgroundColor: '#52c41a' }}>{user.name?.charAt(0) || '?'}</Avatar>
                                    <span>{user.name}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default FloatingChatButton;