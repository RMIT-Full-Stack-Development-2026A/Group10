// src/components/Game/GameBoard.jsx
import React from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';

const GameBoard = () => {
    const {
        board, isPlayerOneTurn, winner,
        handleCellClick, resetGame,
        playerOneMarker, playerTwoMarker
    } = useGameLogic();

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans flex flex-col items-center">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 text-center sm:text-left">
                {winner ? (
                    <h2 className="text-xl font-bold text-green-600 animate-pulse">
                        🎉 {winner} Wins! 🎉
                    </h2>
                ) : (
                    <h2 className="text-lg font-semibold text-gray-800">
                        Current Turn:{' '}
                        <span className={`font-bold ${isPlayerOneTurn ? 'text-blue-600' : 'text-red-600'}`}>
                            {isPlayerOneTurn ? `Player 1 (${playerOneMarker})` : `Player 2 (${playerTwoMarker})`}
                        </span>
                    </h2>
                )}
                <button
                    onClick={resetGame}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Restart Game
                </button>
            </div>

            {/* Responsive 3x3 Tic-Tac-Toe Grid Layout */}
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-xl shadow-inner">
                {board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            className={`w-24 h-24 bg-white flex items-center justify-center text-3xl font-extrabold rounded-lg shadow-sm select-none transition-all duration-150 border border-gray-200/60
                                ${cell ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 active:scale-95'}
                                ${cell === playerOneMarker ? 'text-blue-600' : 'text-red-600'}
                            `}
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