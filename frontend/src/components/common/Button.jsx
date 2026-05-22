import React from 'react';
import './common.css';

export const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    disabled = false,
    className = ''
}) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            className={`custom-btn btn-${variant} ${className}`}
        >
            {children}
        </button>
    );
};