const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const { fetchThreadMessages } = require('../connectors/gmail');
const { normalizeMessage } = require('../services/normalization.service');

router.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);

    // const messages = await fetchThreadMessages(conversation.externalId);

    // for (let msg of messages) {
    //   const normalized = normalizeMessage(msg, conversation._id);

    //   await Message.findOneAndUpdate(
    //     { externalMessageId: msg.id },
    //     normalized,
    //     { upsert: true }
    //   );
    // }

    const storedMessages = await Message.find({
      conversationId: conversation._id
    }).sort({ timestamp: 1 });

    res.json(storedMessages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
