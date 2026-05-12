const getMediumMove = (board, opponent) => {
    // 1. Block any 5-mark line (blocking the 4th mark to prevent the 5th)
    let move = findPattern(board, opponent, 4);
    if (move) return move;

    // 2. Block 4-mark line open on both ends (preventing a "deadly 4")
    move = findPattern(board, opponent, 3, true);
    if (move) return move;

    // 3. Block fork formation (Simplified: block open-ended 3s to prevent forks)
    move = findPattern(board, opponent, 2, true);
    if (move) return move;

    return getRandomMove(board);
};