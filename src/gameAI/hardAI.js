/**
 * Generates a move for the Hard AI level.
 */

const getHardAIMove = (board, aiMarker, playerMarker, boardSize) => {
    const emptySpots = board
        .map((cell, idx) => (cell === null || cell === "" ? idx : null))
        .filter(idx => idx !== null);

    let bestScore = -Infinity;
    let bestMove = emptySpots[0];

    for (let index of emptySpots) {
        let score = calculateMoveScore(board, index, aiMarker, playerMarker, boardSize);

        if (score > bestScore) {
            bestScore = score;
            bestMove = index;
        }
    }

    return bestMove;
};

/**
 * Heuristic scoring for a specific spot on the board.
 */
const calculateMoveScore = (board, index, aiMarker, playerMarker, boardSize) => {
    let score = 0;

    // 1. Check for AI Win (Highest priority)
    if (wouldResultInWin(board, index, aiMarker, boardSize, 5)) return 10000;

    // 2. Check for Player Win (Must block)
    if (wouldResultInWin(board, index, playerMarker, boardSize, 5)) return 5000;

    // 3. Check for AI Fork (Strategic advantage)
    if (createsFork(board, index, aiMarker, boardSize)) score += 1000;

    // 4. Build AI patterns (Aggressive)
    score += countLines(board, index, aiMarker, boardSize, 4) * 100; // Line of 4
    score += countLines(board, index, aiMarker, boardSize, 3) * 10;  // Line of 3

    // 5. Block Player patterns (Defensive)
    score += countLines(board, index, playerMarker, boardSize, 4) * 50;

    return score;
};