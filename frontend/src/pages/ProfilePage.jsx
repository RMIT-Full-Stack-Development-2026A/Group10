// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserInfo from '../components/Profile/UserInfo';
import GameHistory from '../components/Profile/GameHistory';
import PremiumUpgrade from '../components/Profile/PremiumUpgrade';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/'); 
    };

    // Add navigation to the Game room
    const handlePlayGame = () => {
        navigate('/game');
    };

    return (
        <div className="page-wrapper" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Dashboard</h1>
                
                {/* Button Container */}
                <div>
                    <button 
                        onClick={handlePlayGame}
                        style={{
                            padding: '8px 16px', backgroundColor: 'var(--primary-color)', color: 'white',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px'
                        }}>
                        ⚔️ Play Match
                    </button>
                    <button 
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px', backgroundColor: '#f44336', color: 'white',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                        }}>
                        Logout
                    </button>
                </div>
            </div>
            <UserInfo />
            <GameHistory />
            <PremiumUpgrade />
        </div>
    );
};

export default ProfilePage;