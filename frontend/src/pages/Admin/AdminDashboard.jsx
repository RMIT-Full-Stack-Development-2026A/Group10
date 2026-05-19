// src/pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './AdminDashboard.css';
import { useAdmin } from '../../hooks/useAdmin';
import AdminLiveRooms from './AdminLiveRooms'; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { users, isLoading, error, toggleUserStatus } = useAdmin();
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const adminSocket = io('http://localhost:5000'); 
        setSocket(adminSocket);
        return () => adminSocket.disconnect(); 
    }, []);

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
                <h1 style={{ color: '#d32f2f', margin: 0 }}>Admin Control Center</h1>
                <button onClick={() => navigate('/')} className="admin-btn logout">Exit Admin</button>
            </div>
            <div className="admin-card">
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>User Management</h2>
                <div style={{ overflowX: 'auto' }}>
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                        Loading database...
                                    </td>
                                </tr>
                            ) : (
                                users?.map(user => {
                                    const isActive = user.accountStatus === 'Active';
                                    return (
                                        <tr key={user._id}>
                                            <td style={{ fontWeight: 'bold' }}>{user.username}</td>
                                            <td>{user.email}</td>
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
            </div>

            <div style={{ marginTop: '30px' }}>
                <AdminLiveRooms socket={socket} />
            </div>

        </div>
    );
};

export default AdminDashboard;