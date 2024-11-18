import React, { useState } from 'react';
import axios from 'axios';

const OtpSMS: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const requestOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-otp', { phoneNumber });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Invalid OTP');
        }
    };

    return (
        <div>
            <h2>Two-Factor Authentication</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button onClick={requestOtp}>Request OTP</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOtp}>Verify OTP</button>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default OtpSMS;
