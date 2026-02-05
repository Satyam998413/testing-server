const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

// Sample realistic messages
const sampleMessages = [
  "Hey, how are you doing?",
  "Did you get a chance to check that document?",
  "I'm running a bit late, can we reschedule?",
  "That sounds great!",
  "Let me know your thoughts.",
  "Sure, I can handle that.",
  "Thanks for the update.",
  "What time works for you?",
  "Can you send me the link?",
  "I'll get back to you on that."
];

// Sample senders
const senders = ["Admin", "User"];

async function seedDatabase() {
  try {
    console.log('-Seeding');

    // Check if database already has data
    const dataExists = await Conversation.findOne({});
    if (dataExists) {
      console.log("Data already exists. Skipping seeding.");
      return;
    }

    // Clear existing data
    await Conversation.deleteMany();
    await Message.deleteMany();
    console.log("Old data deleted");

    const conversations = [];
    const messages = [];

    // Create 50 Conversations
    for (let i = 1; i <= 50; i++) {
      const unreadCount = Math.floor(Math.random() * 5); // realistic unread messages
      const updatedAt = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)); // last 7 days
      conversations.push({
        platform: "whatsapp",
        externalId: `EXT-${i}`,
        title: `Conversation with ${["Alice", "Bob", "Charlie", "Dave", "Eve"][i % 5]}`,
        lastMessage: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        unreadCount,
        updatedAt
      });
    }

    const createdConversations = await Conversation.insertMany(conversations);
    console.log("50 Conversations Inserted");

    // Create 5-10 messages per conversation
    createdConversations.forEach((conv) => {
      const messageCount = 5 + Math.floor(Math.random() * 6); // 5-10 messages
      let lastTimestamp = new Date(conv.updatedAt.getTime() - messageCount * 3600 * 1000); // spread messages over time

      for (let j = 1; j <= messageCount; j++) {
        const sender = senders[Math.floor(Math.random() * senders.length)];
        const content = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        lastTimestamp = new Date(lastTimestamp.getTime() + Math.floor(Math.random() * 3600 * 1000)); // random gap within an hour

        messages.push({
          conversationId: conv._id,
          platform: conv.platform,
          externalMessageId: `MSG-${conv.externalId}-${j}`,
          sender,
          content,
          timestamp: lastTimestamp
        });
      }
    });

    await Message.insertMany(messages);
    console.log(`${messages.length} Messages Inserted`);
    console.log("Database Seeding Completed Successfully");

  } catch (error) {
    console.error("Error Seeding Data:", error);
    process.exit(1);
  }
}

module.exports = seedDatabase;
