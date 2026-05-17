import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Sidebar from '@/components/SideBar'
import Header from '@/components/Header'
import GameBoard from '@/components/GameBoard'
import GameControls from '@/components/GameControls'
import { useCaroGame } from '@/hooks/useCaroGame'
import { clearAuthUser, getStoredAuthUser } from '@/utils/auth'

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
    } = useCaroGame()

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