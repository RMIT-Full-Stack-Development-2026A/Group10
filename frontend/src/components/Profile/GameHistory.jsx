// src/components/Profile/GameHistory.jsx
import React from 'react';
import './GameHistory.css';
import { useGameHistory } from "../../hooks/useGameHistory";

const GameHistory = () => {
    const { 
        searchTerm, setSearchTerm, filterType, setFilterType, 
        filterResult, setFilterResult, sortOrder, setSortOrder, games 
    } = useGameHistory();

    return (
        <div className="history-card">
            <h3>Match History</h3>

            <div className="controls-container">
                <input 
                    type="text" placeholder="Search by Session # or Opponent..." 
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                    <option value="All">All Game Types</option>
                    <option value="Single Player">Single Player</option>
                    <option value="Two Players">Two Players (Local)</option>
                    <option value="Online Match">Online Match</option>
                </select>
                <select value={filterResult} onChange={(e) => setFilterResult(e.target.value)} className="filter-select">
                    <option value="All">All Results</option>
                    <option value="Win">Win</option>
                    <option value="Lose">Lose</option>
                    <option value="Aborted">Aborted</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                    <option value="desc">Date: Newest First</option>
                    <option value="asc">Date: Oldest First</option>
                </select>
            </div>

            <div className="table-responsive">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Session #</th><th>Date</th><th>Time</th>
                            <th>Game Type</th><th>Opponent</th><th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.length > 0 ? (
                            games.map(game => (
                                <tr key={game.id}>
                                    <td>{game.id}</td><td>{game.date}</td><td>{game.startTime} - {game.endTime}</td>
                                    <td>{game.type}</td><td>{game.opponent}</td>
                                    <td><span className={`badge result-${game.result.toLowerCase()}`}>{game.result}</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="no-data">No matches found matching your criteria.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameHistory;