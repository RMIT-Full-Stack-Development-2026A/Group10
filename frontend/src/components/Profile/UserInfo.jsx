// src/components/Profile/UserInfo.jsx
import React from 'react';
import './UserInfo.css';
import { useProfile } from '../../hooks/useProfile';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

const UserInfo = () => {
    const { profileData, updateMessage, handleChange, handleImageUpload, handleSave } = useProfile();

    const countryOptions = [
        { label: 'Vietnam', value: 'VN' },
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' }
    ];

    return (
        <Card title="Profile Details" className="user-info-card card-lg">
            {updateMessage && <div className="success-banner">{updateMessage}</div>}

            <div className="profile-layout">
                {/* Logo Upload Section */}
                <div className="avatar-section">
                    <div className="avatar-preview">
                        {profileData.logoUrl ? (
                            <img src={profileData.logoUrl} alt="User Avatar" />
                        ) : (
                            <div className="avatar-placeholder">No Logo</div>
                        )}
                    </div>
                    
                    {/* Using our reusable button to trigger the hidden file input */}
                    <Button type="button" variant="secondary" onClick={() => document.getElementById('logo-upload').click()}>
                        Upload Logo
                    </Button>
                    <input 
                        type="file" id="logo-upload" accept="image/*" 
                        onChange={handleImageUpload} style={{ display: 'none' }} 
                    />
                </div>

                {/* Info Edit Form using Reusable Components */}
                <form className="info-form" onSubmit={handleSave}>
                    <Input label="Username" name="username" value={profileData.username} onChange={handleChange} required />
                    <Input label="Email" type="email" name="email" value={profileData.email} onChange={handleChange} required />
                    <Input label="New Password (leave blank to keep current)" type="password" name="password" value={profileData.password} onChange={handleChange} />
                    <Select label="Country" name="country" value={profileData.country} onChange={handleChange} options={countryOptions} required />

                    <Button type="submit" variant="primary">Save Changes</Button>
                </form>
            </div>
        </Card>
    );
};

export default UserInfo;