const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: "YOUR_API_KEY"
});

app.post("/chatbot-prompt", async (req, res) => {
    try {
        const { userPrompt } = req.body;
        
        console.log("Received user prompt:", userPrompt);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [{ "role": "user", "content": userPrompt }],
            max_tokens: 512
        });
        
        console.log('Response from LLM:', response);

        if (response && response.choices && response.choices.length > 0) {
            res.json({ botResponse: response.choices[0].message.content });
        } else {
            res.status(500).json({ error: "No response received from LLM" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

const port = 9090;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
