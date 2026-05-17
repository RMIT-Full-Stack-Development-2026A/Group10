import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faUser,
    faHouse,
    faGamepad,
    faClockRotateLeft,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { NavLink } from 'react-router-dom'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
    onLogout?: () => void
    username?: string
}

interface SidebarItemProps {
    icon: IconDefinition
    label: string
    to: string
    end?: boolean
    onClick?: () => void
}

const Sidebar = ({
                     isOpen = true,
                     onClose,
                     onLogout,
                     username = 'Negic Legend',
                 }: SidebarProps) => {
    return (
        <>
            <div
                onClick={onClose}
                className={`
          hidden portrait:block fixed inset-0 bg-black/40 z-90
          transition-opacity duration-300 top-[10vh] 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
            />

            <div
                className={`
          flex flex-col w-1/5 py-[5vh]
          bg-dark-bg h-full transition-transform duration-300
          portrait:w-4/5 portrait:fixed portrait:top-0 portrait:left-0 z-100
          translate-x-0
          ${isOpen ? 'portrait:translate-x-0' : 'portrait:-translate-x-full'}
        `}
            >
                <div
                    onClick={onClose}
                    className={`hidden ${isOpen ? 'portrait:flex' : 'portrait:hidden'} w-[20vw] h-[10vh] justify-center items-center text-smoke-text text-[3vh] absolute top-0 left-full cursor-pointer`}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className="w-full flex justify-center items-center portrait:gap-[5vw] gap-[1vw] px-[2vw]">
                    <div className="h-[5vh] aspect-square bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.3)] rounded-[1vh] flex justify-center items-center">
                        <FontAwesomeIcon className="text-smoke-text text-[2vh]" icon={faUser} />
                    </div>

                    <p className="text-smoke-text portrait:text-[2.5vh] text-[2vh] max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        {username}
                    </p>
                </div>

                <div className="w-full mt-[5vh] relative flex-1">
                    <div className="flex flex-col z-10 absolute top-0 left-0 w-full">
                        <SidebarItem icon={faHouse} label="Home" to="/" end onClick={onClose} />
                        <SidebarItem icon={faGamepad} label="Game" to="/game" onClick={onClose} />
                        <SidebarItem icon={faClockRotateLeft} label="History" to="/history" onClick={onClose} />
                    </div>
                </div>

                <div className="w-full text-secondary-text portrait:text-[3vh] text-[2vh] px-[2vw]">
                    <div
                        onClick={onLogout}
                        className="flex items-center justify-start portrait:justify-center cursor-pointer gap-[1vw]"
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <p className="max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                            Log Out
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

const SidebarItem = ({
                         icon,
                         label,
                         to,
                         end = false,
                         onClick,
                     }: SidebarItemProps) => {
    return (
        <NavLink
            to={to}
            end={end}
            onClick={onClick}
            className={({ isActive }) => `
        h-[5vh] px-[2vw] w-full flex items-center text-[2vh]
        ${
                isActive
                    ? 'bg-linear-to-r from-purple to-pink rounded-r-[2.5vh] text-smoke-text'
                    : 'cursor-pointer text-secondary-text hoverable:hover:bg-[rgba(255,255,255,0.06)]'
            }
      `}
        >
            {({ isActive }) => (
                <>
                    <div className="w-[5vh]">
                        <FontAwesomeIcon icon={icon} />
                    </div>

                    <p className={`w-full whitespace-nowrap overflow-hidden text-ellipsis uppercase ${isActive ? 'font-bold' : 'font-thin'}`}>
                        {label}
                    </p>
                </>
            )}
        </NavLink>
    )
}

export default Sidebar