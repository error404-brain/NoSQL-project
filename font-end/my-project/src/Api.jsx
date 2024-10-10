// src/api.js
import axios from "axios";
const BASE_URL = "http://localhost:3000/api";

export const searchPackages = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/packages/code`, {
      params: query, // ví dụ { packageCode: 'BP001', packageStatus: 'Đang giao' }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching packages:", error);
    throw error;
  }
};

export const updatePackageWithCode = async (updatePackage) => {
  try {
    const response = await axios.put(`${BASE_URL}/packages/update`, {
      updatePackage,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching packages:", error);
    throw error;
  }
};

export const createCustomerwithAddress = async (customerData, addressDataList) => {
  try {
    const response = await axios.post(`${BASE_URL}/customers/create`, {
      customerData,
      addressDataList,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating customer with address:", error);
    throw error;
  }
};

export const updateCustomerwithAddress = async (customerData, addressDataList) => {
  try {
    const response = await axios.put(`${BASE_URL}/customers/update`, {
      customerData,
      addressDataList,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating customer with address:", error);
    throw error;
  }
};

export const searchCustomersByCode = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/search-by-code`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

export const getAddressesByCustomerCode = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/addresses/by-customer-code`, {
      params: {
        customerCode: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

export const searchCustomersByPhone = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/search-by-phone`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

export const searchCustomersByEmail = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/search-by-email`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

export const searchOrders = async (orderCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/search`, {
      params: orderCode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
