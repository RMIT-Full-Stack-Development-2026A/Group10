const getEasyMove = (board, lastMove) => {
    const { r, c } = lastMove;
    const neighbors = [];
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (board[nr]?.[nc] === null) neighbors.push({ r: nr, c: nc });
        }
    }
    return neighbors.length > 0
        ? neighbors[Math.floor(Math.random() * neighbors.length)]
        : getRandomMove(board);
};