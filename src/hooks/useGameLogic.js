// src/components/Game/useGameLogic.js
import { useState } from 'react';

const BOARD_SIZE = 10;
const WIN_CONDITION = 5;

export const useGameLogic = () => {
    const [board, setBoard] = useState(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const playerOneMarker = '❌';
    const playerTwoMarker = '⭕';

    // NEW: Helper function to save the game to LocalStorage
    const saveMatchToHistory = (winnerName) => {
        const existingHistory = JSON.parse(localStorage.getItem('tictactoang_history') || '[]');
        
        const now = new Date();
        const newMatch = {
            id: `MATCH-${Math.floor(1000 + Math.random() * 9000)}`, // Generate random 4-digit ID
            date: now.toISOString().split('T')[0],
            startTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Simulated as same time for now
            type: 'Two Players',
            opponent: winnerName === 'Player 1' ? 'Player 2 (Lose)' : 'Player 2 (Win)',
            result: winnerName === 'Player 1' ? 'Win' : 'Lose' // Assuming perspective of Player 1
        };

        // Save back to local storage (newest matches first)
        localStorage.setItem('tictactoang_history', JSON.stringify([newMatch, ...existingHistory]));
    };

    const checkWin = (row, col, currentMarker, currentBoard) => {
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (let [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < WIN_CONDITION; i++) {
                const r = row + (dx * i), c = col + (dy * i);
                if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && currentBoard[r][c] === currentMarker) count++;
                else break;
            }
            for (let i = 1; i < WIN_CONDITION; i++) {
                const r = row - (dx * i), c = col - (dy * i);
                if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && currentBoard[r][c] === currentMarker) count++;
                else break;
            }
            if (count >= WIN_CONDITION) return true;
        }
        return false;
    };

    const handleCellClick = (row, col) => {
        if (board[row][col] || winner) return;

        const currentMarker = isPlayerOneTurn ? playerOneMarker : playerTwoMarker;
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = currentMarker;

        if (checkWin(row, col, currentMarker, newBoard)) {
            const winningPlayer = isPlayerOneTurn ? 'Player 1' : 'Player 2';
            setWinner(winningPlayer);
            saveMatchToHistory(winningPlayer); // TRIGGER THE SAVE!
        }

        setBoard(newBoard);
        if (!winner) setIsPlayerOneTurn(!isPlayerOneTurn);
    };

    const resetGame = () => {
        setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
        setWinner(null);
        setIsPlayerOneTurn(true);
    };

    return { board, isPlayerOneTurn, winner, handleCellClick, resetGame, playerOneMarker, playerTwoMarker };
};