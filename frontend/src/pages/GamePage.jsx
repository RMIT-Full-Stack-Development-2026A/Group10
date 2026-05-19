// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../services/socketService'; 
import GameBoard from '../components/Game/GameBoard';

const GamePage = () => {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const [matchData, setMatchData] = useState(null);

    // Keep the WebSocket phone line ready
    useEffect(() => {
        socket.connect();
        
        socket.on('waitingForOpponent', () => setIsSearching(true));
        
        socket.on('matchFound', (data) => {
            setIsSearching(false);
            setMatchData(data); 
        });

        return () => {
            socket.disconnect();
            socket.off('waitingForOpponent');
            socket.off('matchFound');
        };
    }, []);

    // Function to trigger the matchmaking
    const handleFindMatch = () => {
        socket.emit('findMatch');
        setIsSearching(true);
    };

    return (
        <div className="page-wrapper" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate('/profile')}
                style={{ marginBottom: '20px', cursor: 'pointer', padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                ← Back to Dashboard
            </button>

            <GameBoard 
                onStartOnline={handleFindMatch} 
                isSearching={isSearching} 
                matchData={matchData}
                socket={socket}
            />
        </div>
    );
};

// CSS for the loading spinner
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);

export default GamePage;