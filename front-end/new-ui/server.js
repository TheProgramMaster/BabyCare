const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const apiUrl = 'https://api.openai.com/v1/chat/completions';

const apiKey = "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";

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(apiUrl, {
            model: "gpt-4",
            messages: [{ role: "user",content: message}],
            max_tokens: 1024,
            temperature: 0.6,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const botReply = response.data.choices[0]?.message?.content?.trim();

        if(!botReply){
            throw new Error("No reply received from OpenAI API");
        }
        res.send({ reply: botReply })
    } catch(error){
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).send({ error: error.message || 'An error ooccurred' });
    }
});

