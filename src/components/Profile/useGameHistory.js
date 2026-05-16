// src/components/Profile/useGameHistory.js
import { useState, useMemo, useEffect } from 'react';

export const useGameHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterResult, setFilterResult] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');
    
    // NEW: State to hold our dynamic data
    const [matchData, setMatchData] = useState([]);

    // NEW: Load data from localStorage when the dashboard opens
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('tictactoang_history') || '[]');
        setMatchData(storedHistory);
    }, []);

    const filteredAndSortedGames = useMemo(() => {
        let result = [...matchData]; // Use the dynamic data instead of mock data

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
            // Using a simple string comparison since dates are formatted YYYY-MM-DD
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