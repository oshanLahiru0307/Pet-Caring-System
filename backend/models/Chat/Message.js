const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
chatRoomId: { type: String, required: true },
  sender: { type: String, required: true },
  senderRole: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
