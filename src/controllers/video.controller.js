const { createVideo } = require("../services/aiVideo.service");

const generateVideo = async (req, res) => {
  try {
    const { imageUrl, prompt, provider } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const videoUrl = await createVideo({
      imageUrl,
      prompt,
      provider,
    });

    res.json({ videoUrl });
  } catch (error) {
    res.status(500).json({ error: "Video generation failed" });
  }
};

module.exports = { generateVideo };
