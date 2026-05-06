import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

import Sidebar from '@/components/SideBar'
import MiniBoard from '@/components/MiniBoard'
import Header from '@/components/Header'
import { clearAuthUser, getStoredAuthUser } from '@/utils/auth'

const HomePage = () => {
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
            <div className="w-4/5 portrait:w-full bg-background h-full flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <div className="flex-1 p-[5vw] flex justify-center items-center flex-col gap-[5vh]">
                    <p className="text-[4vh] text-pink text-shadow-xs text-shadow-pink uppercase tracking-[0.2vw] text-center">Ready for combat?</p>
                    <p className="text-[2vh] text-smoke-text text-center">Jump into the 10x10 Arena</p>
                    <Link
                        to="/game"
                        className="text-[4vh] portrait:text-[3vh] text-white shadow-[0_0_10px_#D6BAFF] shadow-pink bg-linear-to-b from-purple to-pink font-bold cursor-pointer h-[8vh] portrait:px-[8vw] px-[4vw] rounded-[4vh] flex items-center justify-center gap-[1vw]"
                    >
                        Play Now
                        <FontAwesomeIcon icon={faPlay} />
                    </Link>
                    <MiniBoard
                        cells={[
                            'X', 'O', null,
                            null, 'X', 'O',
                            null, null, null,
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
