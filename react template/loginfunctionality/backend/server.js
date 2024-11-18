const express = require('express');
const cors = require('cors');
const session = require('express-session');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport-setup')
const app = express();
let myOtp=""
//app.use(cors());
//app.use(cors({ origin: 'http://localhost:5173/', credentials: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to the correct origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If you need to allow cookies
}));
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY] // Your cookie key from .env
}));
console.log(process.env.GOOGLE_CLIENT_ID)
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 5 * 60 * 1000 }, // 5 minutes
// }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));


// Routes
app.use('/auth', require('./routes/auth'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
app.post('/send-otp', (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    req.session.otp = otp;
    console.log(req.body.email);
    console.log(req.session.otp);
    myOtp=req.session.otp;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send OTP', error });
        }
        res.json({ message: 'OTP sent' });
    });
});

app.post('/verify-otp', (req, res) => {
    const { otp } = req.body;
    console.log(otp,typeof otp);
    console.log(req.session.otp);
    console.log(myOtp);
    //if (req.session.otp && req.session.otp === parseInt(otp)) {
    if (myOtp && myOtp === parseInt(otp)) {
        console.log(otp)
        delete req.session.otp; // Clear OTP after verification
        res.json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
