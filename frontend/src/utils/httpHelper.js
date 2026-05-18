// src/utils/httpHelper.js

export const httpHelper = async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...customHeaders
    };

    const options = { method, headers };
    if (body instanceof FormData) {
        options.body = body;
        delete headers['Content-Type']; 
    } else if (body) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, options);                                                    
        const data = await response.json().catch(() => null); 

        return {
            data: data,
            status: response.status,
            headers: response.headers
        };
    } catch (error) {
        console.error("HTTP Request Error:", error);
        return {
            data: null,
            status: 500,
            headers: null,
            error: error.message
        };
    }
};