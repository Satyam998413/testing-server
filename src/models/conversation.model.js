const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  platform: String,
  externalId: String,
  title: String,
  lastMessage: String,
  unreadCount: Number,
  updatedAt: Date
});

module.exports =mongoose.model('Conversation', conversationSchema);
