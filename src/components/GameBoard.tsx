import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faO } from '@fortawesome/free-solid-svg-icons'
import type { CellValue, Player } from '@/hooks/useCaroGame'

interface GameBoardProps {
  board: CellValue[]
  winner: Player | null
  winningCells: number[]
  onCellClick: (index: number) => void
}

const GameBoard = ({
  board,
  winner,
  winningCells,
  onCellClick,
}: GameBoardProps) => {
  return (
    <div className="mx-auto dt:mx-0 grid grid-cols-10 grid-rows-10 gap-[0.5vw] pt:w-[90vw] lt:h-[75vh] lt:w-[75vh] dt:h-full portrait:h-auto portrait:w-full aspect-square bg-ghost-bg p-[0.5vw] rounded-[1vw]">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          isWinning={winningCells.includes(index)}
          winner={winner}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  )
}

interface GameCellProps {
  value: CellValue
  isWinning: boolean
  winner: Player | null
  onClick: () => void
}

const GameCell = ({ value, isWinning, winner, onClick }: GameCellProps) => {
  const winningCellClass =
    winner === 'O'
      ? 'shadow-[0_0_15px] shadow-yellow bg-[#4a3a1f]'
      : 'shadow-[0_0_15px] shadow-pink bg-[#3d3350]'

  return (
    <div
      onClick={onClick}
      className={`
        flex justify-center items-center rounded-[1vw] cursor-pointer text-[3vh]
        bg-box-bg hoverable:hover:bg-[rgba(255,255,255,0.08)]
        ${isWinning ? winningCellClass : ''}
      `}
    >
      {value === 'X' && (
        <FontAwesomeIcon className="text-pink" icon={faXmark} />
      )}

      {value === 'O' && (
        <FontAwesomeIcon className="text-yellow" icon={faO} />
      )}
    </div>
  )
}

export default GameBoard
