import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="1014867488836-htupibmgr6qa0mt9dcsru76ji1131plo.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => console.log('Service Worker registered: ', reg))
        .catch((err) => console.log('Service Worker registration failed: ', err));
    });
}