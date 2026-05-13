/*
 * Generates a move for the Medium AI level.
 */

const getMediumAIMove = (board, aiMarker, playerMarker, boardSize) => {
    const emptySpots = board
        .map((cell, idx) => (cell === null || cell === "" ? idx : null))
        .filter(idx => idx !== null);

    // 1. CHANCE TO WIN: Check if AI can win in one move
    for (let index of emptySpots) {
        let tempBoard = [...board];
        tempBoard[index] = aiMarker;
        if (checkWin(tempBoard, index, aiMarker, boardSize).length >= 5) {
            return index;
        }
    }

    // 2. MUST BLOCK: Check if Player can win in one move and block it
    for (let index of emptySpots) {
        let tempBoard = [...board];
        tempBoard[index] = playerMarker;
        if (checkWin(tempBoard, index, playerMarker, boardSize).length >= 5) {
            return index;
        }
    }

    // 3. ADVANCED BLOCKING: Block "Open-4" or "Forks"
    // (Logic: Look for 4-length lines that could become 5)
    for (let index of emptySpots) {
        let tempBoard = [...board];
        tempBoard[index] = playerMarker;
        // Custom helper to detect a "Line of 4"
        if (checkPotentialWin(tempBoard, index, playerMarker, boardSize, 4)) {
            return index;
        }
    }

    // 4. FALLBACK: Use Easy AI logic (adjacent to last player move)
    // You would pass the last move saved in your GameSession here
    return getEasyAIMove(board, lastPlayerMoveIndex, boardSize);
};