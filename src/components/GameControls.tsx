import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBackward,
    faRotateLeft,
    faHandshake
} from '@fortawesome/free-solid-svg-icons'
import type { GameStatus, Player } from '@/hooks/useCaroGame'

interface GameControlsProps {
    currentPlayer: Player
    winner: Player | null
    status: GameStatus
    onUndo: () => void
    onDraw: () => void
    onReset: () => void
}

const GameControls = ({
    currentPlayer,
    winner,
    status,
    onUndo,
    onDraw,
    onReset,
}: GameControlsProps) => {
    const statusText =
        status === 'won'
            ? `${winner} Wins`
            : status === 'draw'
                ? 'Draw'
                : `${currentPlayer}'s Turn`

    const statusColorClass =
        status === 'draw'
            ? 'text-draw shadow-draw'
            : status === 'won'
                ? winner === 'O'
                    ? 'text-yellow shadow-yellow'
                    : 'text-pink shadow-pink'
                : currentPlayer === 'O'
                    ? 'text-yellow shadow-yellow'
                    : 'text-pink shadow-pink'

    const statusBarClass =
        status === 'draw'
            ? 'bg-draw'
            : status === 'won'
                ? winner === 'O'
                    ? 'bg-yellow'
                    : 'bg-pink'
                : currentPlayer === 'O'
                    ? 'bg-yellow'
                    : 'bg-pink'

    return (
        <div className="flex-1 flex portrait:flex-col lt:flex-row dt:flex-col justify-center items-center gap-[3vh]">
            <div
                className={`
          w-full portrait:h-[10vh] pt:h-[6vh] lt:h-[8vh] dt:h-[10vh]
          bg-ghost-bg rounded-[1vw] portrait:rounded-[1vh]
          relative overflow-hidden flex justify-center items-center
          text-[3vh] font-bold tracking-[0.2vw] px-[2vw] shadow-[0_0_20px]
          ${statusColorClass}
        `}
            >
                <div
                    className={`
            h-full w-[0.5vw] top-0 left-0 absolute
            ${statusBarClass}
          `}
                />

                <span className="ml-[1vh]">{statusText}</span>
            </div>

            <div className="w-full lt:gap-[1vw] flex dt:flex-col dt:gap-[3vh] gap-[2vw] portrait:gap-[5vw] pt:h-[6vh] lt:h-[8vh] portrait:h-[10vh] dt:h-[calc(1vw+20vh)]">
                <ActionButton icon={faBackward} label="Undo" onClick={onUndo} />
                <ActionButton icon={faHandshake} label="Draw" onClick={onDraw} />
                <div
                    onClick={onReset}
                    className="bg-ghost-bg mb:hidden dt:hidden flex-1 flex justify-center items-center gap-[1vh] rounded-[1vw] portrait:rounded-[1vh] text-[3vh] text-ghost-text hoverable:hover:text-secondary-text cursor-pointer uppercase duration-100"
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                    <p>Reset</p>
                </div>
            </div>

            <div
                onClick={onReset}
                className="text-[3vh] portrait:h-[10vh] pt:hidden lt:hidden w-full uppercase text-dark-purple hoverable:hover:text-white duration-200 shadow-pink bg-linear-to-b from-purple to-pink font-bold cursor-pointer dt:h-[10vh] px-[4vw] rounded-[1vw] portrait:rounded-[1vh] flex items-center justify-center text-center"
            >
                Reset
            </div>
        </div>
    )
}

interface ActionButtonProps {
    icon: any
    label: string
    onClick: () => void
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-ghost-bg flex-1 dt:h-[10vh] flex justify-center items-center gap-[1vh] rounded-[1vw] portrait:rounded-[1vh] text-[3vh] text-ghost-text hoverable:hover:text-secondary-text cursor-pointer uppercase duration-100"
        >
            <FontAwesomeIcon icon={icon} />
            <p>{label}</p>
        </div>
    )
}

export default GameControls
