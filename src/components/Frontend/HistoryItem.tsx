type MatchResult = 'X' | 'O' | 'DRAW'

interface HistoryItemProps {
    result: MatchResult
    time: string
}

const HistoryItem = ({ result, time }: HistoryItemProps) => {
    const isX = result === 'X'
    const isO = result === 'O'

    return (
        <div className="h-[10vh] shrink-0 w-full rounded-[1vw] portrait:rounded-[2vh] bg-ghost-bg relative px-[3vw] portrait:px-[5vw] flex justify-between items-center overflow-hidden">

            <div
                className={`
          h-full left-0 top-0 absolute w-[0.5vw] portrait:w-[1.5vw]
          ${isX ? 'bg-pink' : isO ? 'bg-yellow' : 'bg-gray-400'}
        `}
            />

            <p
                className={`
          text-[4vh] font-bold
          ${isX ? 'text-pink' : isO ? 'text-yellow' : 'text-gray-400'}
        `}
            >
                {isX && 'X Won'}
                {isO && 'O Won'}
                {result === 'DRAW' && 'Draw'}
            </p>

            <p className="text-smoke-text text-[2vh] font-thin uppercase">
                {time}
            </p>
        </div>
    )
}

export default HistoryItem