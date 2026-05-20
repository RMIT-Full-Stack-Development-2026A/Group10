import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGamepad } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
    onMenuClick?: () => void
    title?: string
}

const Header = ({
                    onMenuClick,
                    title = 'TicTacToang',
                }: HeaderProps) => {
    return (
        <div className="w-full h-[10vh] bg-dark-bg flex justify-center items-center relative">
            <button
                type="button"
                onClick={onMenuClick}
                className="hidden portrait:flex cursor-pointer absolute left-[4vw] top-1/2 -translate-y-1/2 text-smoke-text text-[3vh] h-[5vh] w-[5vh] items-center justify-center"
                aria-label="Open sidebar"
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            <p className="text-[3vh] text-pink font-bold uppercase w-full text-center">
                <FontAwesomeIcon icon={faGamepad} /> {title}
            </p>
        </div>
    )
}

export default Header