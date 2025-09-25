# Pet Care System - Real-time Chat Integration

This document provides instructions for integrating the real-time chat functionality into your existing MERN stack Pet Care System.

## Features

- ✅ Floating chat button (bottom-right corner)
- ✅ Real-time messaging with Socket.IO
- ✅ Message persistence in MongoDB
- ✅ Auto-scroll to latest messages
- ✅ User and doctor identification
- ✅ Smooth animations and modern UI
- ✅ Connection status indicators

## Components Created

### Frontend Components
1. **FloatingChatButton.jsx** - Main chat component with floating button and chat window
2. **Updated UserHomePage.jsx** - Integrated chat component

### Backend Components
1. **MessageSchema.js** - MongoDB schema for messages
2. **chatServer.js** - Socket.IO server with real-time messaging
3. **Updated package.json** - Added chat server script

## Setup Instructions

### 1. Install Dependencies

#### Frontend (userfrontend directory)
```bash
cd userfrontend
npm install socket.io-client
```

#### Backend (backend directory)
```bash
cd backend
npm install socket.io cors
```

### 2. Database Setup

Make sure MongoDB is running and create the messages collection:
```bash
# MongoDB will automatically create the collection when first message is saved
```

### 3. Start the Servers

#### Terminal 1 - Main Backend Server
```bash
cd backend
npm start
```

#### Terminal 2 - Chat Server
```bash
cd backend
npm run chat
```

#### Terminal 3 - Frontend
```bash
cd userfrontend
npm start
```

### 4. Test the Chat

1. Navigate to `/userhome` in your browser
2. You should see a blue floating chat button in the bottom-right corner
3. Click the button to open the chat window
4. Type a message and press Enter to send
5. Messages are saved to MongoDB and displayed in real-time

## API Endpoints

### GET /api/messages/:conversationId
Retrieve message history for a conversation
- **Parameters**: conversationId (format: userId_doctorId)
- **Response**: Array of message objects

### POST /api/messages
Save a new message
- **Body**: { userId, userName, doctorId, doctorName, text, sender }
- **Response**: Saved message object

## Socket.IO Events

### Client to Server
- `joinConversation` - Join a conversation room
- `sendMessage` - Send a new message
- `typing` - User is typing
- `stopTyping` - User stopped typing

### Server to Client
- `message` - New message received
- `messageHistory` - Loaded conversation history
- `userTyping` - Another user is typing
- `userStopTyping` - Another user stopped typing

## Customization

### Change Doctor Information
In `FloatingChatButton.jsx`, update the doctor information:
```javascript
const [doctorName, setDoctorName] = useState('Dr. Smith'); // Change this
```

### Modify Chat Window Size
In `FloatingChatButton.jsx`, update the width:
```javascript
<div className="fixed bottom-24 right-6 z-40 w-80 bg-white...">
// Change w-80 to your preferred width (w-72, w-96, etc.)
```

### Change Server Port
In `chatServer.js`, update the port:
```javascript
const PORT = process.env.PORT || 4000; // Change 4000 to your preferred port
```

## File Structure

```
userfrontend/
├── src/
│   ├── components/
│   │   └── FloatingChatButton.jsx
│   └── pages/
│       └── UserHomePage.jsx (updated)

backend/
├── models/
│   └── Message/
│       └── MessageSchema.js
├── chatServer.js
└── package.json (updated)
```

## Troubleshooting

### Chat Button Not Appearing
- Check if FloatingChatButton is imported in UserHomePage
- Verify the component is rendered in the JSX

### Connection Issues
- Ensure chat server is running on port 4000
- Check MongoDB connection
- Verify CORS settings in chatServer.js

### Messages Not Saving
- Check MongoDB connection
- Verify Message model is properly imported
- Check server console for errors

## Security Considerations

For production deployment, consider:
- Adding authentication middleware
- Implementing rate limiting
- Adding input validation and sanitization
- Using HTTPS for Socket.IO connections
- Adding user authorization checks

## Next Steps

1. Add typing indicators
2. Implement message read receipts
3. Add file/image sharing
4. Create admin panel for chat management
5. Add push notifications
6. Implement chat history search

