import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faO } from '@fortawesome/free-solid-svg-icons'

type CellValue = 'X' | 'O' | null

interface MiniBoardProps {
  cells: CellValue[]
}

const MiniBoard = ({ cells }: MiniBoardProps) => {
  return (
    <div className="w-1/3 portrait:w-[60%] aspect-square grid grid-cols-3 grid-rows-3 gap-[1vw] text-[5vh]">
      {cells.map((cell, index) => (
        <MiniCell key={index} value={cell} />
      ))}
    </div>
  )
}

interface MiniCellProps {
  value: CellValue
}

const MiniCell = ({ value }: MiniCellProps) => {
  return (
    <div className="flex justify-center items-center bg-box-bg rounded-[1vw] portrait:rounded-[1vh]">
      {value === 'X' && (
        <FontAwesomeIcon className="text-pink" icon={faXmark} />
      )}

      {value === 'O' && (
        <FontAwesomeIcon className="text-yellow" icon={faO} />
      )}
    </div>
  )
}

export default MiniBoard