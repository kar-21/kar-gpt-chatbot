var express = require("express");
const OpenAIModule = require("openai");
var router = express.Router();

const openAI = new OpenAIModule({
  apiKey: process.env.CHAT_GPT_KEY,
});

/* GET home page. */
router.post("/", async (req, res, next) => {
  try {
    const response = await openAI.chat.completions.create({
      messages: [{ role: "user", content: req.body.question }],
      model: "gpt-3.5-turbo",
    });
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
