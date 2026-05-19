// src/components/Game/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import './GameBoard.css';
import { ChatBox } from './ChatBox';
import { useGameLogic } from "../../hooks/useGameLogic";
import { useProfile } from '../../hooks/useProfile';    

const AVAILABLE_MARKERS = ['❌', '⭕', '⚔️', '🛡️', '🚀', '🌟'];

const GameBoard = ({ onStartOnline, isSearching, matchData, socket }) => {
    const { 
        gameStarted, startGame, boardSize, boardStyle,
        board, isPlayerOneTurn, winner, handleCellClick, resetGame, 
        playerOneMarker, playerTwoMarker, gameMode 
    } = useGameLogic(matchData);
    
    const navigate = useNavigate();
    const { profileData } = useProfile();
    const [selectedSize, setSelectedSize] = useState(10);
    const [selectedStyle, setSelectedStyle] = useState('style-classic');
    const [p1Mark, setP1Mark] = useState('⚔️');
    const [p2Mark, setP2Mark] = useState('🛡️');
    const [selectedMode, setSelectedMode] = useState('Single Player');
    const [selectedDiff, setSelectedDiff] = useState('Easy');

    useEffect(() => {
        if (matchData) {
            startGame(selectedSize, selectedStyle, p1Mark, p2Mark, 'Online Multiplayer', null);
        }
    }, [matchData]); 

        if (!gameStarted) {
        const modeOptions = [
            { label: 'Single Player (vs AI)', value: 'Single Player' },
            { label: 'Two Players (Local)', value: 'Two Players' },
            { label: 'Online Multiplayer', value: 'Online' }
        ];

        if (!socket) return;
        socket.on('gameTerminatedByAdmin', (message) => {
            alert(`🚨 ${message}`);
            navigate('/profile');
            return () => socket.off('gameTerminatedByAdmin');
    }, [socket, navigate]);
        
        const aiOptions = [
            { label: 'Jeremy (Easy)', value: 'Easy' },
            { label: 'Bot (Medium)', value: 'Medium' },
            { label: 'Overlord (Hard)', value: 'Hard' }
        ];

        const sizeOptions = [
            { label: '10 x 10', value: 10 },
            { label: '15 x 15', value: 15 }
        ];

        const styleOptions = [
            { label: 'Classic', value: 'style-classic' },
            { label: 'Neon Dark', value: 'style-dark' },
            { label: 'Wooden', value: 'style-wood' }
        ];

        const markerOptions = AVAILABLE_MARKERS.map(m => ({ label: m, value: m }));

        return (
            <div className="game-setup-container">
                <Card title="Match Setup" className="card-lg">
                    
                    <div className="setup-grid">
                        <Select 
                            label="Game Mode" name="mode" 
                            value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} 
                            options={modeOptions} disabled={isSearching} 
                        />
                        
                        {selectedMode === 'Single Player' ? (
                            <Select 
                                label="AI Level" name="ai" 
                                value={selectedDiff} onChange={(e) => setSelectedDiff(e.target.value)} 
                                options={aiOptions} disabled={isSearching} 
                            />
                        ) : (
                            <div className="empty-grid-slot"></div> 
                        )}

                        <Select 
                            label="Board Size" name="size" 
                            value={selectedSize} onChange={(e) => setSelectedSize(Number(e.target.value))} 
                            options={sizeOptions} disabled={isSearching} 
                        />

                        <Select 
                            label="Board Style" name="style" 
                            value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)} 
                            options={styleOptions} disabled={isSearching} 
                        />

                        <Select 
                            label="Player 1 Marker" name="p1Mark" 
                            value={p1Mark} onChange={(e) => setP1Mark(e.target.value)} 
                            options={markerOptions} disabled={isSearching} 
                        />

                        <Select 
                            label="Player 2 / Bot Marker" name="p2Mark" 
                            value={p2Mark} onChange={(e) => setP2Mark(e.target.value)} 
                            options={markerOptions} disabled={isSearching} 
                        />
                    </div>

                    {isSearching ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <div className="spinner" style={{ margin: '0 auto 10px', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>Searching for an opponent...</p>
                        </div>
                    ) : (
                        <div className="start-btn-container">
                            <Button 
                                variant="primary"
                                style={{ backgroundColor: selectedMode === 'Online' ? '#4CAF50' : '' }}
                                onClick={() => {
                                    if (selectedMode === 'Online') {
                                        onStartOnline(); 
                                    } else {
                                        startGame(selectedSize, selectedStyle, p1Mark, p2Mark, selectedMode, selectedDiff);
                                    }
                                }}
                                disabled={p1Mark === p2Mark}
                            >
                                {p1Mark === p2Mark ? "Select different markers!" : (selectedMode === 'Online' ? "🌍 Find Online Match" : "Enter Arena")}
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        );
    }


    if (gameMode === 'Online Multiplayer') {
        console.log("Here is the matchData:", matchData);
    }
    
    const colLabels = Array.from({ length: boardSize }, (_, i) => String.fromCharCode(97 + i));
    
    return (
        <div className={`game-container ${boardStyle}`}>
            <div className="game-header">
                {gameMode === 'Online Multiplayer' && matchData && (
                    <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold', border: '1px solid #c8e6c9' }}>
                        🌍 Online Match • You are {matchData.role}
                    </div>
                )}

                {winner ? (
                    <h2 className="winner-text">🎉 {winner} Wins! 🎉</h2>
                ) : (
                    <h2>
                        Turn: <span className={isPlayerOneTurn ? 'p1-turn' : 'p2-turn'}>
                            {isPlayerOneTurn ? `Player 1 (${playerOneMarker})` : `Player 2 (${playerTwoMarker})`}
                        </span>
                    </h2>
                )}
                <button className="reset-btn" onClick={() => {
                    resetGame();
                    if (gameMode === 'Online Multiplayer') {
                        window.location.reload(); 
                    }
                }}>
                    End Match / Setup
                </button>
            </div>

        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                
                <div className="board-wrapper">
                    <div className="y-axis">
                        {board.map((_, rowIndex) => (
                            <div key={`y-${rowIndex}`} className="coord-label">{boardSize - rowIndex}</div>
                        ))}
                    </div>

                    <div>
                        <div className="board-grid" style={{ gridTemplateColumns: `repeat(${boardSize}, 40px)`, gridTemplateRows: `repeat(${boardSize}, 40px)` }}>
                            {board.map((row, rowIndex) => (
                                row.map((cell, colIndex) => (
                                    <div key={`${rowIndex}-${colIndex}`} className={`board-cell ${cell ? 'taken' : ''}`} onClick={() => handleCellClick(rowIndex, colIndex)}>
                                        {cell}
                                    </div>
                                ))
                            ))}
                        </div>
                        <div className="x-axis" style={{ gridTemplateColumns: `repeat(${boardSize}, 40px)` }}>
                            {colLabels.map(letter => (
                                <div key={`x-${letter}`} className="coord-label">{letter}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {gameMode === 'Online Multiplayer' && matchData && (
                    <div style={{ width: '100%', maxWidth: '350px' }}>
                        <ChatBox 
                            socket={socket} 
                            roomId={matchData.room || matchData.roomId || matchData.id} 
                            currentUser={profileData?.username || 'You'} 
                        />
                    </div>
                )}
                
            </div> 

        </div>
    );
};
export default GameBoard;