const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation.model');
const { fetchThreads } = require('../connectors/gmail');
const { normalizeThread } = require('../services/normalization.service');

router.get('/', async (req, res) => {
  try {
    // const threads = await fetchThreads();

    // for (let thread of threads) {
    //   const normalized = normalizeThread(thread);

    //   await Conversation.findOneAndUpdate(
    //     { externalId: thread.id },
    //     normalized,
    //     { upsert: true }
    //   );
    // }

    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    res.json(conversations);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
