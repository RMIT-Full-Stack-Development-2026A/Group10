// src/components/Admin/AdminLiveRooms.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

const AdminLiveRooms = ({ socket }) => {
    const [liveRooms, setLiveRooms] = useState([]);

    useEffect(() => {
        if (!socket) return;
        
        // Ask the server for the active rooms immediately
        socket.emit('getAdminRooms');
        
        // Poll the server every 5 seconds to keep the list fresh
        const interval = setInterval(() => {
            socket.emit('getAdminRooms');
        }, 5000);

        // Listen for the backend's response
        socket.on('adminRoomsList', (rooms) => {
            setLiveRooms(rooms);
        });

        // Cleanup
        return () => {
            clearInterval(interval);
            socket.off('adminRoomsList');
        };
    }, [socket]);

    const handleKillRoom = (roomId) => {
        if (window.confirm(`🚨 Are you sure you want to terminate Room ${roomId}? This will kick both players out.`)) {
            socket.emit('forceCloseRoom', roomId);
        }
    };

    return (
        <Card title="Live Game Rooms (Admin Overlord)" className="card-lg">
            {liveRooms.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                    No active multiplayer games right now.
                </p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', backgroundColor: '#f9f9f9' }}>
                                <th style={{ padding: '12px' }}>Room ID</th>
                                <th>Active Players</th>
                                <th>Admin Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveRooms.map((room) => (
                                <tr key={room.roomId} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#2196F3' }}>
                                        {room.roomId}
                                    </td>
                                    <td>
                                        <span style={{ backgroundColor: room.playerCount === 2 ? '#e8f5e9' : '#fff3e0', color: room.playerCount === 2 ? '#2e7d32' : '#e65100', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            {room.playerCount} / 2
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ width: '120px' }}>
                                            <Button variant="danger" onClick={() => handleKillRoom(room.roomId)}>
                                                Force Close
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
};

export default AdminLiveRooms;