
import React from 'react';

const AuthButtons: React.FC = () => {
    const handleGoogleLogin = () => {
        window.open('http://localhost:5000/auth/google', '_self');
    };

    const handleFacebookLogin = () => {
        window.open('http://localhost:5000/auth/facebook', '_self');
    };

    return (
        <div>
            <h1>Login with:</h1>
            <button onClick={handleGoogleLogin}>Google</button>
            <button onClick={handleFacebookLogin}>Facebook</button>
        </div>
    );
};

export default AuthButtons;
