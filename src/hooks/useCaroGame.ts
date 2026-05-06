import { useState } from 'react'

export type Player = 'X' | 'O'
export type CellValue = Player | null
export type GameStatus = 'playing' | 'won' | 'draw'

const BOARD_SIZE = 10
const WIN_LENGTH = 5

const createBoard = (): CellValue[] =>
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () => null)

const getRowCol = (index: number) => ({
    row: Math.floor(index / BOARD_SIZE),
    col: index % BOARD_SIZE,
})

const getIndex = (row: number, col: number) => row * BOARD_SIZE + col

const isInsideBoard = (row: number, col: number) =>
    row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE

export const useCaroGame = () => {
    const [board, setBoard] = useState<CellValue[]>(createBoard())
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
    const [winner, setWinner] = useState<Player | null>(null)
    const [status, setStatus] = useState<GameStatus>('playing')
    const [moveHistory, setMoveHistory] = useState<number[]>([])
    const [winningCells, setWinningCells] = useState<number[]>([])

    const checkWin = (
        nextBoard: CellValue[],
        index: number,
        player: Player
    ): number[] => {
        const { row, col } = getRowCol(index)

        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal down
            [1, -1],  // diagonal up
        ]

        for (const [dr, dc] of directions) {
            const line: number[] = [index]

            for (let step = 1; step < WIN_LENGTH; step++) {
                const r = row + dr * step
                const c = col + dc * step

                if (!isInsideBoard(r, c)) break

                const nextIndex = getIndex(r, c)
                if (nextBoard[nextIndex] !== player) break

                line.push(nextIndex)
            }

            for (let step = 1; step < WIN_LENGTH; step++) {
                const r = row - dr * step
                const c = col - dc * step

                if (!isInsideBoard(r, c)) break

                const nextIndex = getIndex(r, c)
                if (nextBoard[nextIndex] !== player) break

                line.unshift(nextIndex)
            }

            if (line.length >= WIN_LENGTH) {
                return line.slice(0, WIN_LENGTH)
            }
        }

        return []
    }

    const makeMove = (index: number) => {
        if (status !== 'playing') return
        if (board[index]) return

        const nextBoard = [...board]
        nextBoard[index] = currentPlayer

        const winLine = checkWin(nextBoard, index, currentPlayer)

        setBoard(nextBoard)
        setMoveHistory((prev) => [...prev, index])

        if (winLine.length > 0) {
            setWinner(currentPlayer)
            setStatus('won')
            setWinningCells(winLine)

            console.log('Save match result:', {
                winner: currentPlayer,
                result: `${currentPlayer} wins`,
                mode: 'local',
                endedAt: new Date().toISOString(),
            })

            return
        }

        const isDraw = nextBoard.every((cell) => cell !== null)

        if (isDraw) {
            setStatus('draw')

            console.log('Save match result:', {
                winner: null,
                result: 'draw',
                mode: 'local',
                endedAt: new Date().toISOString(),
            })

            return
        }

        setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
    }

    const resetGame = () => {
        setBoard(createBoard())
        setCurrentPlayer('X')
        setWinner(null)
        setStatus('playing')
        setMoveHistory([])
        setWinningCells([])
    }

    const undoMove = () => {
        if (status !== 'playing') return
        if (moveHistory.length === 0) return

        const lastMove = moveHistory[moveHistory.length - 1]

        setBoard((prev) => {
            const nextBoard = [...prev]
            nextBoard[lastMove] = null
            return nextBoard
        })

        setMoveHistory((prev) => prev.slice(0, -1))
        setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
    }

    const declareDraw = () => {
        if (status !== 'playing') return

        setWinner(null)
        setStatus('draw')
        setWinningCells([])

        console.log('Save match result:', {
            winner: null,
            result: 'draw',
            mode: 'local',
            endedAt: new Date().toISOString(),
        })
    }

    return {
        board,
        currentPlayer,
        winner,
        status,
        winningCells,
        makeMove,
        resetGame,
        undoMove,
        declareDraw,
    }
}