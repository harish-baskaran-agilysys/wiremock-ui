// src/api.js

import axios from "axios";

const url = "http://localhost:5001";
const url_wiremock = "http://localhost:5001";

export const getData = async () => {
  try {
    const response = await axios.get(`${url_wiremock}/__admin/mappings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (data = {}) => {
  try {
    const response = await axios.post(`${url_wiremock}/__admin/mappings`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const persistData = async () => {
  try {
    const response = await axios.post(`${url_wiremock}/__admin/mappings/save`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteData = async (data = {}) => {
  try {
    const response = await axios.delete(`${url_wiremock}/__admin/mappings/`+data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const runServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url}/run-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stopServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url}/stop-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url}/check-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequestLog = async () => {
  try {
    const response = await axios.get(`${url}/__admin/requests`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching request log: " + error.message);
  }
};