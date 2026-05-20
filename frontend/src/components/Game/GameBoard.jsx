// src/components/Game/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import { useGameLogic } from "../../hooks/useGameLogic";

const AVAILABLE_MARKERS = ['❌', '⭕', '⚔️', '🛡️', '🚀', '🌟'];

const GameBoard = ({ onStartOnline, isSearching, matchData }) => {
    const { 
        gameStarted, startGame, boardSize, setBoardSize, boardStyle,
        board, isPlayerOneTurn, winner, handleCellClick, resetGame, 
        playerOneMarker, playerTwoMarker, gameMode 
    } = useGameLogic(matchData);
    
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
        return (
            <div className="game-setup-container">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Match Setup</h2>
                
                <div className="setup-group flex-row">
                    <div style={{ flex: 1 }}>
                        <label>Game Mode:</label>
                        <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} disabled={isSearching}>
                            <option value="Single Player">Single Player (vs AI)</option>
                            <option value="Two Players">Two Players (Local)</option>
                            <option value="Online">Online Multiplayer</option>
                        </select>
                    </div>
                    {selectedMode === 'Single Player' && (
                        <div style={{ flex: 1 }}>
                            <label>AI Level:</label>
                            <select value={selectedDiff} onChange={(e) => setSelectedDiff(e.target.value)} disabled={isSearching}>
                                <option value="Easy">Jeremy (Easy)</option>
                                <option value="Medium">Bot (Medium)</option>
                                <option value="Hard">Overlord (Hard)</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="setup-group flex-row">
                    <div style={{ flex: 1 }}>
                        <label>Board Size:</label>
                        <div className="size-btn-container">
                            <button
                                type="button"
                                onClick={() => setBoardSize('10x10')}
                                className={`size-btn btn-10x10 ${boardSize === '10x10' ? 'active' : ''}`}
                            >
                                10x10
                            </button>
                            <button
                                type="button"
                                onClick={() => setBoardSize('15x15')}
                                className={`size-btn btn-15x15 ${boardSize === '15x15' ? 'active' : ''}`}
                            >
                                15x15
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Board Style:</label>
                        <div className="style-btn-container">
                            <button
                                type="button"
                                onClick={() => setBoardStyle('Light')}
                                className={`size-btn btn-light ${boardStyle === 'light' ? 'active' : ''}`}
                            >
                                Classic Light
                            </button>
                            <button
                                type="button"
                                onClick={() => setBoardStyle('Dark')}
                                className={`size-btn btn-dark ${boardStyle === 'dark' ? 'active' : ''}`}
                            >
                                Neon Dark
                            </button>
                            <button
                                type="button"
                                onClick={() => setBoardStyle('Wooden')}
                                className={`size-btn btn-wooden ${boardStyle === 'wooden' ? 'active' : ''}`}
                            >
                                Wooden
                            </button>
                        </div>
                    </div>
                </div>

                <div className="setup-group flex-row">
                    <div style={{ flex: 1 }}>
                        <label>Player 1 Marker:</label>
                        <select value={p1Mark} onChange={(e) => setP1Mark(e.target.value)} disabled={isSearching}>
                            {AVAILABLE_MARKERS.map(m => <option key={`p1-${m}`} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Player 2 / Bot Marker:</label>
                        <select value={p2Mark} onChange={(e) => setP2Mark(e.target.value)} disabled={isSearching}>
                            {AVAILABLE_MARKERS.map(m => <option key={`p2-${m}`} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>

                {isSearching ? (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <div className="spinner" style={{ margin: '0 auto 10px', width: '30px', height: '30px', border: '3px solid #f3f3f3', borderTop: '3px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>Searching for an opponent...</p>
                    </div>
                ) : (
                    <button 
                        className="start-btn" 
                        style={{ backgroundColor: selectedMode === 'Online' ? '#4CAF50' : '' }}
                        onClick={() => {
                            if (selectedMode === 'Online') {
                                onStartOnline(); // Tell GamePage to dial the server!
                            } else {
                                startGame(selectedSize, selectedStyle, p1Mark, p2Mark, selectedMode, selectedDiff);
                            }
                        }}
                        disabled={p1Mark === p2Mark}
                    >
                        {p1Mark === p2Mark ? "Select different markers!" : (selectedMode === 'Online' ? "🌍 Find Online Match" : "Enter Arena")}
                    </button>
                )}
            </div>
        );
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
                    <div className="x-axis" style={{ gridTemplateColumns: `repeat(${boardSize}, 42px)` }}>
                        {colLabels.map(letter => (
                            <div key={`x-${letter}`} className="coord-label">{letter}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;