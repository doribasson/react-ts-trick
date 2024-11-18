import React, { useState } from 'react';
import axios from 'axios';

const OTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { email }, { withCredentials: true });
      setOtpSent(true);
      setMessage('OTP sent to your email');
    } catch (error) {
      setMessage('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { otp }, { withCredentials: true });
      setMessage(response.data.message);
      setOtpSent(false); // Reset after successful verification
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>OTP Verification</h1>
      {!otpSent ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTP;
