import React from 'react';
import './common.css';

export const Select = ({ 
    label, 
    name, 
    value, 
    onChange, 
    options, 
    error 
}) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={name} className="input-label">{label}</label>}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`custom-select ${error ? 'input-error' : ''}`}
            >
                <option value="" disabled>-- Select an option --</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};