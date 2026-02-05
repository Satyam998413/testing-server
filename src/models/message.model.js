const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
  platform: String,
  externalMessageId: String,
  sender: String,
  content: String,
  timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);
