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

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
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


export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders/create`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};


export const updateOrderWithCode = async (orderData) => {
  try {
    const response = await axios.put(`${BASE_URL}/orders/${orderData.orderCode}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteOrder = async (orderCode) => {
  try {
    const response = await axios.delete(`${BASE_URL}/orders/${orderCode}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error.response?.data || error.message);
    throw error;
  }
};


export const createPackage = async (packageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/packages/create`, packageData);
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePackageWithOrderCode = async (orderCode, packagesArray) => {
  try {
    await axios.put(`${BASE_URL}/packages/updateOrderCode`, {
      orderCode: orderCode,
      packages: packagesArray,
    });
  } catch (error) {
    console.error("Error updating packages with orderCode:", error.response?.data || error.message);
    throw error;
  }
};
