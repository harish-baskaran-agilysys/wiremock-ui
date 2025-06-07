// src/api.js

import axios from "axios";
import { extractAndStoreCategoriesFromStubs } from "wiremock/pages/app/mappings/categoryMappings/categoryManager";
import { getWiremockUrl } from "wiremock/utils/wiremockUrl";

export const getData = async () => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.get(`${url_wiremock}/__admin/mappings`);
    extractAndStoreCategoriesFromStubs(response.data.mappings);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataById = async (id) => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.get(`${url_wiremock}/__admin/mappings/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (data = {}) => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.post(`${url_wiremock}/__admin/mappings`, data);
    await persistData();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (stubMappingId, updatedData = {}) => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.put(
      `${url_wiremock}/__admin/mappings/${stubMappingId}`,
      updatedData
    );
    await persistData();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const persistData = async () => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.post(`${url_wiremock}/__admin/mappings/save`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteData = async (mappingId) => {
  const url_wiremock = getWiremockUrl();
  if (!mappingId) {
    throw new Error("Mapping ID is required to delete a stub.");
  }

  try {
    const response = await axios.delete(`${url_wiremock}/__admin/mappings/${mappingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getRequestLog = async () => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.get(`${url_wiremock}/__admin/requests`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching request log: " + error.message);
  }
};


const url_server = "http://localhost:3001";

export const runServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url_server}/run-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stopServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url_server}/stop-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkServer = async (data = {}) => {
  try {
    const response = await axios.post(`${url_server}/check-command`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

