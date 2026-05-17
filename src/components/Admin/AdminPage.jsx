import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch players on mount
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('/api/admin/players');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error('Failed to fetch players:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    // Handle deactivate/reactivate toggle
    const handleToggleStatus = async (playerId, currentStatus) => {
        try {
            const response = await fetch(`/api/admin/players/${playerId}/toggle-status`, {
                method: 'PUT',
            });

            if (response.ok) {
                // Optimistically update the UI
                setPlayers(players.map(p =>
                    p._id === playerId ? { ...p, isActive: !currentStatus } : p
                ));
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading players...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player) => (
                        <tr key={player._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-5 py-5 text-sm">{player.username}</td>
                            <td className="px-5 py-5 text-sm">{player.email}</td>
                            <td className="px-5 py-5 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${player.isPremium ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                    {player.isPremium ? 'Premium' : 'Standard'}
                  </span>
                            </td>
                            <td className="px-5 py-5 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${player.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {player.isActive ? 'Active' : 'Deactivated'}
                  </span>
                            </td>
                            <td className="px-5 py-5 text-sm">
                                <button
                                    onClick={() => handleToggleStatus(player._id, player.isActive)}
                                    className={`px-4 py-2 rounded text-white text-xs font-bold transition-colors ${player.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                >
                                    {player.isActive ? 'Deactivate' : 'Reactivate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;