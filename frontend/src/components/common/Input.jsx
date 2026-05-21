import React from 'react';
import './common.css';

export const Input = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    placeholder, 
    error 
}) => {

    return (
        <div className="input-group">
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`custom-input ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};