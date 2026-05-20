// src/components/Game/botLogic.js
const getRandomMove = (board, boardSize) => {
    const emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === null) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length === 0) return null;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const getEasyMove = (board, boardSize, lastMove) => {
    if (!lastMove) return getRandomMove(board, boardSize);
    const { r, c } = lastMove;
    const adjacentCells = [];
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (let [dr, dc] of directions) {
        const newRow = r + dr, newCol = c + dc;
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === null) {
            adjacentCells.push({ r: newRow, c: newCol });
        }
    }
    if (adjacentCells.length > 0) return adjacentCells[Math.floor(Math.random() * adjacentCells.length)];
    return getRandomMove(board, boardSize);
};

const evaluatePosition = (board, boardSize, row, col, targetMarker) => {
    let score = 0;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    let openThrees = 0;

    for (let [dx, dy] of directions) {
        let count = 1; 
        let openEnds = 0;
        let i = 1;
        while (row + (dx * i) >= 0 && row + (dx * i) < boardSize && col + (dy * i) >= 0 && col + (dy * i) < boardSize) {
            const cell = board[row + (dx * i)][col + (dy * i)];
            if (cell === targetMarker) count++;
            else if (cell === null) { openEnds++; break; }
            else break;
            i++;
        }

        let j = 1;
        while (row - (dx * j) >= 0 && row - (dx * j) < boardSize && col - (dy * j) >= 0 && col - (dy * j) < boardSize) {
            const cell = board[row - (dx * j)][col - (dy * j)];
            if (cell === targetMarker) count++;
            else if (cell === null) { openEnds++; break; }
            else break;
            j++;
        }

        if (count >= 5) score += 100000; 
        else if (count === 4 && openEnds === 2) score += 10000; 
        else if (count === 4 && openEnds === 1) score += 5000;  
        else if (count === 3 && openEnds === 2) {
            openThrees++;
            score += 1000; 
        } else if (count === 2 && openEnds === 2) score += 100; 
    }

    if (openThrees >= 2) score += 20000; 

    return score;
};

const getMediumMove = (board, boardSize, lastMove, humanMarker) => {
    let bestScore = -1;
    let bestMoves = [];

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === null) {
                const score = evaluatePosition(board, boardSize, r, c, humanMarker);
                if (score > bestScore) { bestScore = score; bestMoves = [{ r, c }]; } 
                else if (score === bestScore) bestMoves.push({ r, c });
            }
        }
    }
    if (bestScore > 0 && bestMoves.length > 0) return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return getEasyMove(board, boardSize, lastMove);
};

const getHardMove = (board, boardSize, lastMove, humanMarker, botMarker) => {
    let bestScore = -1;
    let bestMoves = [];

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === null) {
                const defenseScore = evaluatePosition(board, boardSize, r, c, humanMarker);
                const attackScore = evaluatePosition(board, boardSize, r, c, botMarker);
                const adjustedAttack = attackScore >= 100000 ? 500000 : attackScore;
                const totalScore = defenseScore + adjustedAttack;

                if (totalScore > bestScore) { 
                    bestScore = totalScore; 
                    bestMoves = [{ r, c }]; 
                } 
                else if (totalScore === bestScore) {
                    bestMoves.push({ r, c });
                }
            }
        }
    }

    if (bestScore > 0 && bestMoves.length > 0) return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return getEasyMove(board, boardSize, lastMove);
};


export const botLogic = {
    calculateMove: (board, boardSize, difficulty, lastPlayerMove, humanMarker, botMarker) => {
        switch (difficulty) {
            case 'Easy':
                return getEasyMove(board, boardSize, lastPlayerMove);
            case 'Medium':
                return getMediumMove(board, boardSize, lastPlayerMove, humanMarker);
            case 'Hard':
                return getHardMove(board, boardSize, lastPlayerMove, humanMarker, botMarker);
            default:
                return getEasyMove(board, boardSize, lastPlayerMove);
        }
    }
};