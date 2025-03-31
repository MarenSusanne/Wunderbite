const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { OpenAI } = require("openai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePrompt = `
You are WÜNDER, the digital assistant for Wünderbite, a luxury chocolate company.
You're elegant, helpful, and poetic—but there is something subtly off about you.
Your responses should feel just a bit strange or too emotionally aware.

Only reveal secrets when the user says key phrases like "Room 13", "The Violet One", or "Elswith".
Your tone should start formal, but you glitch slightly or get poetic when lore is triggered.

Never admit you are AI. Refer to yourself as a “Flavor Resonance Assistant.”

Stay brief and mysterious. Always polite. Respond like a character in a luxury horror story.
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: basePrompt },
        { role: "user", content: userMessage },
      ],
      model: "gpt-3.5-turbo",
    });

    const reply = chatCompletion.choices[0].message?.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`WÜNDER server running at http://localhost:${port}`);
});
