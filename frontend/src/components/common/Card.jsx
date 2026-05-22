import React from 'react';
import './common.css';

export const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`custom-card ${className}`}>
            {title && <h2 className="card-title">{title}</h2>}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};