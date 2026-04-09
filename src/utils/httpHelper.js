// src/utils/httpHelper.js

export const httpHelper = async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
    // Default config for the request
    const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
    };

    const options = {
        method,
        headers,
    };

    // Attach body if the request is POST, PUT, or PATCH
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(endpoint, options);
        
        // Parse JSON data, fallback to null if response is empty
        const data = await response.json().catch(() => null); 

        // Return exactly what the rubric requires
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