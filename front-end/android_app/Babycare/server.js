const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const moment = require('moment');
const { APIService } = require('./APIService')
const { TokenService } = require('./TokenService');

const tokenService = new TokenService();
const apiService = new APIService(tokenService);

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

// Endpoint to get token of our 100ms Video Chat SDK for Rooms
app.post("/get-token", (req, res) => {
    //const { roomCode } = req.body;

    try {
        const { roomCode } = req.body;
        if (!roomCode){
            return res.status(400).json({ error: 'Room code is required'});
        }
        const tokenServer = new TokenService();
        const authToken = tokenService.getAuthToken({
            room_id: roomCode,
            user_id: 'generatedUserId',
            role: 'user',
        });
        res.json({ token: authToken });
        
    } catch(error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Failed to generate auth token" });
    }
});

app.post('/create-room', async(req, res) => {
    const payload = {
        "name": req.body.name,
        "description": req.body.description,
        "template_id": req.body.template_id,
        "region": req.body.region
    };

    try {
        const resData = await APIService.post("/rooms", payload);
        res.json(resData);
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/auth-token', (req, res) => {
    try {
        const token = tokenService.getAuthToken({ room_id: req.body['room_id'], user_id: req.body['user_id'], role: req.body['role'] });
        res.json({
            token: token,
            msg: "Token generated successfully!",
            success: true,
        });
    } catch(error){
        res.json({
            msg: "Some error occured!",
            success: false,
        });
    }
});

app.get('/sesson-analytics-by-room', async (req, res) => {
    try{
        const sessionListData = await apiService.get("/sessions", { room_id: req.query.room_id });
        if(sessionListData.data.length > 0){
            const sessionData = sessionListData.data[0];
            console.log(sessionData);

            const peers = Object.values(sessionData.peers);
            const detailsByUser = peers.reduce((acc, peer) => {
                const duration = moment
                    .duration(moment(peer.left_at).diff(moment(peer.joined_at)))
                    .asMinutes();
                const roundedDuration = Math.round(duration * 100) / 100;
                acc[peer.user_id] = {
                    "name": peer.name,
                    "user_id": peer.user_id,
                    "duration": (acc[peer.user_id] || 0) + roundedDuration
                };
                return acc;
            }, {});
            const result = Object.values(detailsByUser);
            console.log(result);

            const totalDuration = result
                .reduce((a,b) => a + b.duration, 0)
                .toFixed(2)
            console.log(`Total duration for all peers: ${totalDuration} minutes`);
            const sessionDuration = moment
                .duration(moment(sessionData.updated_at).diff(moment(sessionData.created_at)))
                .asMinutes()
                .toFixed(2);
            console.log(`Session duration is: ${sessionDuration} minutes`);

            res.json({
                "user_duration_list": result,
                "session_duration": sessionDuration,
                "total_peer_duration": totalDuration
            });
        } else{
            res.status(404).send("No session found for this room");
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});