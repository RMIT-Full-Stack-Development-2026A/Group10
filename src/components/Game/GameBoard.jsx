// src/components/Game/GameBoard.jsx
import React from 'react';
import './GameBoard.css';
import { useGameLogic } from './useGameLogic';

const GameBoard = () => {
    const { 
        board, isPlayerOneTurn, winner, 
        handleCellClick, resetGame, 
        playerOneMarker, playerTwoMarker 
    } = useGameLogic();

    return (
        <div className="game-container">
            <div className="game-header">
                {winner ? (
                    <h2 className="winner-text">🎉 {winner} Wins! 🎉</h2>
                ) : (
                    <h2>
                        Current Turn: <span className={isPlayerOneTurn ? 'p1-turn' : 'p2-turn'}>
                            {isPlayerOneTurn ? `Player 1 (${playerOneMarker})` : `Player 2 (${playerTwoMarker})`}
                        </span>
                    </h2>
                )}
                <button className="reset-btn" onClick={resetGame}>Restart Game</button>
            </div>

            <div className="board-grid">
                {board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`} 
                            className={`board-cell ${cell ? 'taken' : ''}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell}
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};

export default GameBoard;