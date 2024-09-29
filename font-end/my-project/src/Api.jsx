// src/api.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';

export const searchPackages = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/packages/code`, {
            params: query  // ví dụ { packageCode: 'BP001', packageStatus: 'Đang giao' }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching packages:', error);
        throw error;
    }
};

export const createCustomer = async (customer) => {
    try {
        const response = await axios.post(`${BASE_URL}/customers`, customer);
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

export const searchCustomersByPhone = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/customers/search`, {
            params: query
        });
        return response.data;
    } catch (error) {
        console.error('Error searching customers:', error);
        throw error;
    }
}

export const searchOrders = async (orderCode) => {
    try {
        const response = await axios.get(`${BASE_URL}/orders/search`, {
            params: { orderCode }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};