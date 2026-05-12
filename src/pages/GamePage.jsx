// src/pages/GamePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameBoard from '../components/Game/GameBoard';

const GamePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper" style={{ padding: '40px' }}>
            <button 
                onClick={() => navigate('/profile')}
                style={{ marginBottom: '20px', cursor: 'pointer', padding: '5px 10px' }}
            >
                ← Back to Dashboard
            </button>
            <GameBoard />
        </div>
    );
};

export default GamePage;