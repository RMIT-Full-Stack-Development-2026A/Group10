// src/components/Game/useGameLogic.js
import { useState, useEffect } from 'react';
import { botLogic } from '../components/Game/botLogic';
import { profileService } from '../services/profileService';
import { socket } from '../services/socketService'; 

const WIN_CONDITION = 5;

// Accept matchData as a parameter
export const useGameLogic = (matchData) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [boardSize, setBoardSize] = useState('10x10');
    const [boardStyle, setBoardStyle] = useState('style-classic');
    const [playerOneMarker, setPlayerOneMarker] = useState('⚔️');
    const [playerTwoMarker, setPlayerTwoMarker] = useState('🛡️');
    const [gameMode, setGameMode] = useState('Single Player');
    const [difficulty, setDifficulty] = useState('Easy');
    const [lastMove, setLastMove] = useState(null); 
    const [board, setBoard] = useState([]);
    const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const startGame = (size, style, p1Mark, p2Mark, mode, diff) => {
        setBoardSize(size);
        setBoardStyle(style);
        setPlayerOneMarker(p1Mark);
        setPlayerTwoMarker(p2Mark);
        setGameMode(mode);
        setDifficulty(diff);
        setBoard(Array(size).fill(null).map(() => Array(size).fill(null)));
        setGameStarted(true);
        setIsPlayerOneTurn(true);
        setWinner(null);
        setLastMove(null);
    };

    const saveMatchToHistory = async (winnerName) => {
        let opponentName = 'Player 2';
        let mappedGameType = 'Local'; 
        
        if (gameMode === 'Single Player') {
            opponentName = difficulty === 'Easy' ? 'Jeremy (Easy)' : `Bot (${difficulty})`;
            mappedGameType = 'Bot';
        } else if (gameMode === 'Online Multiplayer') {
            opponentName = 'Online Opponent';
            mappedGameType = 'Online';
        }

        let finalResult = 'Loss';
        if (winnerName === 'Player 1' && (!matchData || matchData.role === 'Player 1')) finalResult = 'Win';
        if (winnerName === 'Player 2' && (matchData && matchData.role === 'Player 2')) finalResult = 'Win';
        if (winnerName === 'Draw') finalResult = 'Draw';

        try {
            await profileService.saveGameResult('me', { opponentName, gameType: mappedGameType, result: finalResult });
        } catch (error) {
            console.error("Failed to save match:", error);
        }
    };

    const checkWin = (row, col, currentMarker, currentBoard) => {
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (let [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < WIN_CONDITION; i++) {
                const r = row + (dx * i), c = col + (dy * i);
                if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && currentBoard[r][c] === currentMarker) count++;
                else break;
            }
            for (let i = 1; i < WIN_CONDITION; i++) {
                const r = row - (dx * i), c = col - (dy * i);
                if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && currentBoard[r][c] === currentMarker) count++;
                else break;
            }
            if (count >= WIN_CONDITION) return true;
        }
        return false;
    };

    // Modified to accept currentBoard directly to prevent stale closures
    const executeMove = (row, col, marker, playerName, currentBoard = board) => {
        const newBoard = currentBoard.map(r => [...r]);
        newBoard[row][col] = marker;
        
        setLastMove({ r: row, c: col }); 
        setBoard(newBoard);

        if (checkWin(row, col, marker, newBoard)) {
            setWinner(playerName);
            saveMatchToHistory(playerName);
        } else {
            setIsPlayerOneTurn(playerName !== 'Player 1');
        }
    };

    const handleCellClick = (row, col) => {
        if (board[row][col] || winner) return;
        if (gameMode === 'Single Player' && !isPlayerOneTurn) return;
        if (gameMode === 'Online Multiplayer' && matchData) {
            const isMyTurn = (matchData.role === 'Player 1' && isPlayerOneTurn) || 
                             (matchData.role === 'Player 2' && !isPlayerOneTurn);
            if (!isMyTurn) return; 
        }

        const currentPlayerName = isPlayerOneTurn ? 'Player 1' : 'Player 2';
        const currentMarker = isPlayerOneTurn ? playerOneMarker : playerTwoMarker;
        executeMove(row, col, currentMarker, currentPlayerName, board);

        if (gameMode === 'Online Multiplayer' && matchData) {
            socket.emit('makeMove', {
                room: matchData.room,
                row,
                col,
                marker: currentMarker,
                playerName: currentPlayerName
            });
        }
    };
    useEffect(() => {
        const size = boardSize === '15x15' ? 15 : 10;

        // Creates a blank 2D array of size x size filled with null strings
        const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
        setBoard(newBoard);

        // Optional: Reset turns or victory parameters here when switching maps
    }, [boardSize]);

    // Listen for incoming moves from the opponent
    useEffect(() => {
        const handleOpponentMove = (data) => {
            executeMove(data.row, data.col, data.marker, data.playerName, board);
        };
        const handleOpponentDisconnect = () => {
            if (!winner && gameMode === 'Online Multiplayer' && matchData) {
                setWinner(`${matchData.role} (Opponent Fled!)`);
                saveMatchToHistory(matchData.role);
            }
        };


        socket.on('opponentMove', handleOpponentMove);
        socket.on('opponentDisconnected', handleOpponentDisconnect);

        return () => {
            socket.off('opponentMove', handleOpponentMove);
            socket.off('opponentDisconnected', handleOpponentDisconnect);
        };
    }, [board, isPlayerOneTurn, winner, gameMode, matchData]);

    // Bot logic
    useEffect(() => {
        if (!isPlayerOneTurn && gameMode === 'Single Player' && !winner) {
            const timer = setTimeout(() => {
                const botMove = botLogic.calculateMove(board, boardSize, difficulty, lastMove, playerOneMarker, playerTwoMarker);
                if (botMove) {
                    executeMove(botMove.r, botMove.c, playerTwoMarker, 'Player 2', board);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isPlayerOneTurn, gameMode, winner, board]);

    const resetGame = () => setGameStarted(false);

    return { 
        gameStarted, startGame, boardSize, setBoardSize, boardStyle, setBoardStyle,
        board, isPlayerOneTurn, winner, handleCellClick, resetGame, 
        playerOneMarker, playerTwoMarker, gameMode 
    };
};