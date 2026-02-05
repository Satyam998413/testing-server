
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

async function seedDatabase() {
  try {
    console.log('-Seeding')
    // Connect using your existing function
    // await connectDB();

    // Clear existing data
    let data=Conversation.findOne({});
    if(data){
      return;
    }
    await Conversation.deleteMany();
    await Message.deleteMany();

    console.log("Old data deleted");

    const conversations = [];
    const messages = [];

    // Create 50 Conversations
    for (let i = 1; i <= 50; i++) {
      conversations.push({
        platform: "whatsapp",
        externalId: `EXT-${i}`,
        title: `Conversation ${i}`,
        lastMessage: `Last message of conversation ${i}`,
        unreadCount: Math.floor(Math.random() * 10),
        updatedAt: new Date()
      });
    }

    const createdConversations = await Conversation.insertMany(conversations);
    console.log("50 Conversations Inserted");

    // Create 5 messages per conversation
    createdConversations.forEach((conv, index) => {
      for (let j = 1; j <= 5; j++) {
        messages.push({
          conversationId: conv._id,
          platform: conv.platform,
          externalMessageId: `MSG-${index + 1}-${j}`,
          sender: j % 2 === 0 ? "Admin" : "User",
          content: `Message ${j} in ${conv.title}`,
          timestamp: new Date()
        });
      }
    });

    await Message.insertMany(messages);

    console.log("250 Messages Inserted");
    console.log("Database Seeding Completed Successfully");
  } catch (error) {
    console.error("Error Seeding Data:", error);
    process.exit(1);
  }
}

module.exports=seedDatabase;
