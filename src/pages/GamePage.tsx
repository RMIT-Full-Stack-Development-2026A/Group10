import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Sidebar from '../components/Frontend/SideBar'
import Header from '../components/Frontend/Header'
import GameBoard from '../components/Game/GameBoard.jsx'
import GameControls from '../components/Game/GameControls.jsx'
import { useGameLogic } from '../hooks/useGameLogic.js'
import { clearAuthUser, getStoredAuthUser } from '../utils/Auth'

const GamePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const username = getStoredAuthUser()?.username ?? 'Player'

    const {
        board,
        currentPlayer,
        winner,
        status,
        winningCells,
        makeMove,
        resetGame,
        undoMove,
        declareDraw,
    } = useGameLogic()

    const handleLogout = () => {
        clearAuthUser()
        navigate('/login', { replace: true })
    }

    return (
        <div className="h-dvh w-screen flex">
            <Sidebar
                isOpen={sidebarOpen}
                username={username}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />
            <div className="w-4/5 portrait:w-full h-full flex flex-col bg-background">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <div className="flex-1 flex lt:p-[1vw] p-[2vw] gap:gap-[3vh] dt:gap-[2vw] dt:flex-row flex-col">
                    <GameBoard
                        board={board}
                        winner={winner}
                        winningCells={winningCells}
                        onCellClick={makeMove}
                    />

                    <GameControls
                        currentPlayer={currentPlayer}
                        winner={winner}
                        status={status}
                        onUndo={undoMove}
                        onDraw={declareDraw}
                        onReset={resetGame}
                    />
                </div>
            </div>
        </div>
    )
}

export default GamePage