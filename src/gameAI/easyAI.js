/**
 * Generates a move for the Easy AI level.
 * @param {Array} board - The flat board array.
 * @param {number} lastPlayerIndex - The index of the player's last move.
 * @param {number} boardSize - 10 or 15.
 * @returns {number} - The index for the AI's move.
 */

const getEasyAIMove = (board, lastPlayerIndex, boardSize) => {
    const row = Math.floor(lastPlayerIndex / boardSize);
    const col = lastPlayerIndex % boardSize;

    const adjacents = [];

    // Define all 8 possible directions around the last move
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue; // Skip the player's move itself

            const r = row + dr;
            const c = col + dc;

            // 1. Check boundaries
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                const index = r * boardSize + c;
                // 2. Check if the spot is empty
                if (!board[index]) {
                    adjacents.push(index);
                }
            }
        }
    }

    // 3. If adjacents exist, pick one randomly
    if (adjacents.length > 0) {
        const randomIndex = Math.floor(Math.random() * adjacents.length);
        return adjacents[randomIndex];
    }

    // 4. Fallback: Pick any random empty spot on the board
    const allEmptySpots = board
        .map((cell, idx) => (cell === null || cell === "" ? idx : null))
        .filter(idx => idx !== null);

    const fallbackIndex = Math.floor(Math.random() * allEmptySpots.length);
    return allEmptySpots[fallbackIndex];
};