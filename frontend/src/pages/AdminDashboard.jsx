// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { useAdmin } from '../hooks/useAdmin'; 

const MOCK_ROOMS = [
    { roomId: 'ROOM-8821', p1: 'PlayerOne', p2: 'Guest44', startTime: '10:00 AM', status: 'Active' },
    { roomId: 'ROOM-9932', p1: 'Alice', p2: 'Bob', startTime: '10:15 AM', status: 'Active' },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { users, isLoading, error, toggleUserStatus } = useAdmin();
    const [rooms, setRooms] = useState(MOCK_ROOMS);
    const [roomSearch, setRoomSearch] = useState('');
    const closeRoom = (roomId) => {
        setRooms(rooms.filter(r => r.roomId !== roomId));
        alert(`Room ${roomId} has been forcibly closed.`);
    };

    const filteredRooms = rooms.filter(r => 
        r.roomId.toLowerCase().includes(roomSearch.toLowerCase()) || 
        r.p1.toLowerCase().includes(roomSearch.toLowerCase()) || 
        r.p2.toLowerCase().includes(roomSearch.toLowerCase())
    );

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px', color: '#d32f2f' }}>
                <h2>{error}</h2>
                <button onClick={() => navigate('/')} className="admin-btn logout">Return Home</button>
            </div>
        );
    }

    return (
        <div className="page-wrapper" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#d32f2f' }}>Admin Control Center</h1>
                <button onClick={() => navigate('/')} className="admin-btn logout">Exit Admin</button>
            </div>

            <div className="admin-card">
                <h2>User Management</h2>
                <table className="admin-table">
                    <thead><tr><th>Username</th><th>Email</th><th>Premium</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading database...</td></tr>
                        ) : (
                            users.map(user => {
                                const isActive = user.accountStatus === 'Active';
                                return (
                                    <tr key={user._id}>
                                        <td>{user.username}</td><td>{user.email}</td>
                                        <td>{user.isPremium ? '⭐ Yes' : 'No'}</td>
                                        <td>
                                            <span className={`status-badge ${isActive ? 'active' : 'banned'}`}>
                                                {user.accountStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => toggleUserStatus(user._id)} 
                                                className={`admin-btn ${isActive ? 'ban' : 'reactivate'}`}
                                            >
                                                {isActive ? 'Deactivate' : 'Reactivate'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h2>Live Game Rooms</h2>
                    <input 
                        type="text" placeholder="Search by Room # or Player..." 
                        value={roomSearch} onChange={(e) => setRoomSearch(e.target.value)}
                        style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                
                <table className="admin-table">
                    <thead><tr><th>Room #</th><th>Player 1</th><th>Player 2</th><th>Start Time</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredRooms.length > 0 ? filteredRooms.map(room => (
                            <tr key={room.roomId}>
                                <td>{room.roomId}</td><td>{room.p1}</td><td>{room.p2}</td><td>{room.startTime}</td>
                                <td><button onClick={() => closeRoom(room.roomId)} className="admin-btn ban">Force Close</button></td>
                            </tr>
                        )) : <tr><td colSpan="5" style={{ textAlign: 'center' }}>No active rooms found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;