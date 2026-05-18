import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Sidebar from '../components/Frontend/SideBar'
import Header from '../components/Frontend/Header'
import HistoryList from '../components/Frontend/HistoryList'
import { clearAuthUser, getStoredAuthUser } from '../utils/Auth'

const HistoryPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const username = getStoredAuthUser()?.username ?? 'Player'

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
                <div className="flex flex-col flex-1 px-[5vw] p-[5vh] gap-[4vh]">
                    <div className="flex w-full justify-around portrait:justify-between items-center h-[20vh]">
                        <div className="flex flex-col h-full portrait:rounded-[2vh] justify-center items-center px-[6vw] rounded-[1vw] bg-ghost-bg shadow-[0_0_10px_rgba(214,186,255,0.4)]">
                            <p className="text-pink text-[5vh] font-extrabold text-center">X</p>
                            <p className="text-smoke-text text-[2vh] text-center">Wins</p>
                            <p className="text-[4vh] text-smoke-text font-extrabold text-center">185</p>
                        </div>
                        <p className="text-[4vh] text-smoke-text font-bold">VS</p>
                        <div className="flex flex-col h-full portrait:rounded-[2vh] justify-center items-center px-[6vw] rounded-[1vw] bg-ghost-bg shadow-[0_0_10px_rgba(255,186,75,0.4)]">
                            <p className="text-yellow text-[5vh] font-extrabold text-center">O</p>
                            <p className="text-smoke-text text-[2vh] text-center">Wins</p>
                            <p className="text-[4vh] text-smoke-text font-extrabold text-center">129</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="w-full justify-center items-center text-[4vh] text-smoke-text h-[6vh] font-bold text-center">Matches</div>
                        <HistoryList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryPage