/**
 * Detects if the current move resulted in a win (5 in a row).
 * @param {Array} board - The flat array representing the board.
 * @param {number} index - The index of the move just made.
 * @param {string} player - The marker ('X' or 'O').
 * @param {number} boardSize - 10 or 15.
 * @returns {Array} - The winning indices or an empty array.
 */
import NotationUtils from '../../utils/notation.js';
import gameRepository from '../repositories/gameRepository';

const checkWin = (board, index, player, boardSize) => {
    const WIN_LENGTH = 5;
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal down-right
        [1, -1],  // diagonal up-right
    ];

    for (const [dr, dc] of directions) {
        const winningLine = [index];

        // Check forward direction
        for (let step = 1; step < WIN_LENGTH; step++) {
            const r = row + dr * step;
            const c = col + dc * step;

            if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;

            const nextIndex = r * boardSize + c;
            if (board[nextIndex] !== player) break;

            winningLine.push(nextIndex);
        }

        // Check backward direction
        for (let step = 1; step < WIN_LENGTH; step++) {
            const r = row - dr * step;
            const c = col - dc * step;

            if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;

            const nextIndex = r * boardSize + c;
            if (board[nextIndex] !== player) break;

            winningLine.unshift(nextIndex);
        }

        if (winningLine.length >= WIN_LENGTH) {
            return winningLine.slice(0, WIN_LENGTH);
        }
    }

    return [];
};

// Inside GameService makeMove function
const moveNotation = NotationUtils.indexToAlgebraic(index, session.boardSize);

await gameRepository.addMove(sessionId, {
    player: currentPlayerMarker,
    coordinate: moveNotation, // Saved as "c2" per req 4.3.3
    timestamp: new Date()
});