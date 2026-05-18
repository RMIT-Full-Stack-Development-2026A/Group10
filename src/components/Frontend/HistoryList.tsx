import HistoryItem from './HistoryItem'

type MatchResult = 'X' | 'O' | 'DRAW'

interface Match {
    id: string
    result: MatchResult
    createdAt: string
}

const mockData: Match[] = [
    { id: '1', result: 'X', createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { id: '2', result: 'O', createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
    { id: '3', result: 'X', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: '4', result: 'O', createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
    { id: '5', result: 'DRAW', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
]

const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()

    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (mins < 60) return `${mins} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    if (days < 7) return `${days} days ago`

    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const HistoryList = () => {
    const sorted = [...mockData].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    )

    return (
        <div className="w-full h-[50vh] overflow-y-auto flex flex-col gap-[2vh]">
            {sorted.map((match) => (
                <HistoryItem
                    key={match.id}
                    result={match.result}
                    time={formatTime(match.createdAt)}
                />
            ))}
        </div>
    )
}

export default HistoryList