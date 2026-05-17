import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Ensure this path matches your file structure

const AdminPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleToggleStatus = async (playerId, currentStatus) => {
        try {
            const response = await fetch(`/api/admin/players/${playerId}/toggle-status`, {
                method: 'PUT',
            });

            if (response.ok) {
                setPlayers(players.map(p =>
                    p._id === playerId ? { ...p, isActive: !currentStatus } : p
                ));
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    if (loading) return <div className="loading-text">Loading players...</div>;

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Premium</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player) => (
                        <tr key={player._id}>
                            <td>{player.username}</td>
                            <td>{player.email}</td>
                            <td>
                  <span className={`badge ${player.isPremium ? 'badge-premium' : 'badge-standard'}`}>
                    {player.isPremium ? 'Premium' : 'Standard'}
                  </span>
                            </td>
                            <td>
                  <span className={`badge ${player.isActive ? 'badge-active' : 'badge-deactivated'}`}>
                    {player.isActive ? 'Active' : 'Deactivated'}
                  </span>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleToggleStatus(player._id, player.isActive)}
                                    className={`btn ${player.isActive ? 'btn-deactivate' : 'btn-reactivate'}`}
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

export default AdminPage;