// src/components/Profile/UserInfo.jsx
import React from 'react';
import './UserInfo.css';
import { useProfile } from '../../hooks/useProfile';

const UserInfo = () => {
    const { profileData, updateMessage, handleChange, handleImageUpload, handleSave } = useProfile();

    return (
        <div className="user-info-card">
            <h3>Profile Details</h3>
            
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
                    <label htmlFor="logo-upload" className="upload-btn">
                        Upload Logo
                    </label>
                    <input 
                        type="file" 
                        id="logo-upload" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: 'none' }} 
                    />
                </div>

                {/* Info Edit Form */}
                <form className="info-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={profileData.username} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password (leave blank to keep current)</label>
                        <input type="password" id="password" name="password" value={profileData.password} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select id="country" name="country" value={profileData.country} onChange={handleChange} required>
                            <option value="VN">Vietnam</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                        </select>
                    </div>

                    <button type="submit" className="save-btn">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;