const { createImage } = require("../services/aiImage.service");

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const imageUrl = await createImage(prompt);
    res.json({ imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

const getData = async (req, res) => {
  return res.send({data:'Yes i got it bro'})
};

module.exports = { generateImage,getData };
