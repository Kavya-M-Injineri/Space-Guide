import axios from 'axios';

const API_BASE_URL = '';

let authToken = localStorage.getItem('spaceguard_token');

const getHeaders = () => {
    console.log("Using token:", authToken ? "PRESENT" : "MISSING");
    return {
        headers: { Authorization: `Bearer ${authToken}` }
    };
};

export const login = async (username, password) => {
    console.log("Attempting login for:", username);
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
        console.log("Login response received:", response.status);
        authToken = response.data.token;
        localStorage.setItem('spaceguard_token', authToken);
        return response.data;
    } catch (error) {
        console.error('Login request failed:', error.response?.data || error.message);
        return null;
    }
};

export const getHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data;
    } catch (error) {
        console.error('Error fetching health:', error);
        return { status: 'offline' };
    }
};

export const getMetrics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/metrics`, getHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching metrics:', error);
        return null;
    }
};

export const predictAnomaly = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, { data }, getHeaders());
        return response.data;
    } catch (error) {
        console.error('Error predicting anomaly:', error);
        return null;
    }
};
