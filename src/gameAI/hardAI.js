const getHardMove = (board, aiPlayer, opponent) => {
    // Priority 1: Attack - Can I complete my own 5-mark line?
    let move = findPattern(board, aiPlayer, 4);
    if (move) return move;

    // Priority 2: Defense - Use Medium AI logic to block
    return getMediumMove(board, opponent);
};