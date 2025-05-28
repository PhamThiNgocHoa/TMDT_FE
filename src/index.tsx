// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Thay 'react-dom' thành 'react-dom/client'
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Tạo root cho React
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
