// Necessary libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // frontend
        methods: ['GET', 'POST']
    }
});

// Models
const User = require('./models/User/UserModel');
const Message = require('./models/Chat/Message');

// Routes
const UserRoutes = require('./routes/User/UserRoutes');
const DoctorRoutes = require('./routes/Doctor/DoctorRoutes');
const AppointmentRoutes = require('./routes/Appointment/AppointmentRoutes');
const PostRoutes = require('./routes/Post/PostRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/users', UserRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/appointments', AppointmentRoutes);
app.use('/posts', PostRoutes);

// Socket.IO - Real-time chat
const connectedUsers = {}; // { socketId: { id, name, role } }

// Helper function to get all users (doctors and regular users)
const getAllChatUsers = async () => {
    try {
        const users = await User.find({}, 'name role');
        return [...users,];
    } catch (err) {
        console.error('Error fetching all users:', err);
        return [];
    }
};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // New event to register user details (id, name, role)
    socket.on('registerUser', async (userData) => {
        // Store user data associated with the socket ID
        connectedUsers[socket.id] = { 
            id: userData.id, 
            name: userData.name, 
            role: userData.role 
        };
        console.log(`User registered: ${userData.name} (${userData.role}) with socket ID ${socket.id}`);

        // Get the full list of users and emit it to the client
        const allUsers = await getAllChatUsers();
        socket.emit('allUsers', allUsers);
    });

    // Join conversation
    socket.on('joinConversation', async ({ sender, receiver }) => {
        if (!sender || !receiver) {
            console.error('joinConversation: sender or receiver missing');
            return;
        }

        const chatRoomId = [sender, receiver].sort().join('_');
        socket.join(chatRoomId);
        console.log(`Socket ${socket.id} joined room: ${chatRoomId}`);

        try {
            // Send chat history
            const messages = await Message.find({ chatRoomId }).sort({ createdAt: 1 });
            socket.emit('messageHistory', messages);
        } catch (err) {
            console.error('Error fetching chat history:', err);
        }
    });

    // Send message
    socket.on('sendMessage', async (data) => {
        const { sender, receiver,senderRole, message } = data;
        if (!sender || !receiver || !message || !senderRole) {
            console.error('sendMessage: missing sender, receiver, senderRole or message');
            return;
        }

        const chatRoomId = [sender, receiver].sort().join('_');

        try {
            const newMessage = new Message({
                chatRoomId,
                sender,
                receiver,
                senderRole,
                message,
                createdAt: new Date()
            });

            await newMessage.save();

            // Emit the message to all clients in the room
            io.to(chatRoomId).emit('message', newMessage);

            // Logic for new message notification
            const receiverSocketData = Object.values(connectedUsers).find(user => user.id === receiver);
            
            // Check if the receiver exists and their current socket is not in the active chat room
            if (receiverSocketData && !io.sockets.sockets.get(receiverSocketData.socketId)?.rooms.has(chatRoomId)) {
                io.to(receiverSocketData.socketId).emit('newMessageNotification', { sender });
                console.log(`Sent notification to ${receiverSocketData.name}`);
            }

        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (connectedUsers[socket.id]) {
            const { name } = connectedUsers[socket.id];
            delete connectedUsers[socket.id];
            console.log(`User ${name} removed from connected users list.`);
        }
    });
});

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });