
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport-setup')
const twilio = require("twilio");
const app = express();

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.json());
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to the correct origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If you need to allow cookies
}));


app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    req.session.otp = otp;

    try {
        await client.messages.create({
            body: `Your verification code is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });
        res.send({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).send('Failed to send OTP');
    }
});

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (req.session.otp === otp) {
        res.send({ message: 'OTP verified successfully' });
    } else {
        res.status(400).send({ message: 'Invalid OTP' });
    }
});

//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = twilio(accountSid, authToken);

async function createMessage() {
    const message = await client.messages.create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+972525818887",
      to: "+972525818887",
    });
  
    console.log(message.body);
  }
  
  createMessage();
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
