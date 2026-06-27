import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login({ setUser, user}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSuccess = (credentialResponse) => {
        const decoded = JSON.parse(
            atob(credentialResponse.credential.split('.')[1])
        );
        const userData = { name: decoded.name, email: decoded.email, picture: decoded.picture};
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/');
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className ="login-container">
            <h2>Login to StreamList</h2>
            <p>Please sign in with Google to continue.</p>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} size="medium" />
        </div>
    );
}

export default Login;