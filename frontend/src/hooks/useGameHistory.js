// src/components/Profile/useGameHistory.js
import { useState, useMemo, useEffect } from 'react';
import { profileService } from "../services/profileService";

export const useGameHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterResult, setFilterResult] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');
    
    // State to hold our dynamic data
    const [matchData, setMatchData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await profileService.getGameHistory('me');
            
            if (response && response.data) {
                const formattedData = response.data.map(match => {
                    const dateObj = new Date(match.createdAt);
                    
                    return {
                        id: match._id.substring(match._id.length - 6).toUpperCase(), 
                        date: dateObj.toISOString().split('T')[0],
                        startTime: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        endTime: 'N/A', 
                        
                        type: match.gameType === 'Bot' ? 'Single Player' : 
                             (match.gameType === 'Local' ? 'Two Players' : 'Online Match'),
                        
                        opponent: match.opponentName,
                        result: match.result === 'Loss' ? 'Lose' : match.result
                    };
                });
                
                setMatchData(formattedData);
            }
        };

        fetchHistory();
    }, []);

    const filteredAndSortedGames = useMemo(() => {
        let result = [...matchData]; 

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            result = result.filter(game => 
                game.id.toLowerCase().includes(lowerCaseSearch) || 
                game.opponent.toLowerCase().includes(lowerCaseSearch)
            );
        }

        if (filterType !== 'All') {
            result = result.filter(game => game.type === filterType);
        }
        if (filterResult !== 'All') {
            result = result.filter(game => game.result === filterResult);
        }

        result.sort((a, b) => {
            return sortOrder === 'desc' 
                ? b.date.localeCompare(a.date) 
                : a.date.localeCompare(b.date);
        });

        return result;
    }, [searchTerm, filterType, filterResult, sortOrder, matchData]);

    return {
        searchTerm, setSearchTerm,
        filterType, setFilterType,
        filterResult, setFilterResult,
        sortOrder, setSortOrder,
        games: filteredAndSortedGames
    };
};