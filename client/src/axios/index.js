// src/api.js

import axios from "axios";
import { extractAndStoreCategoriesFromStubs } from "wiremock/pages/app/mappings/categoryMappings/categoryManager";
import { getWiremockUrl } from "wiremock/pages/app/utils/wiremockUrl";

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
    const response = await axios.post(
      `${url_wiremock}/__admin/mappings`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await axios.post(
      `${url_wiremock}/__admin/mappings/save`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (mappingId) => {
  const url_wiremock = getWiremockUrl();
  if (!mappingId) {
    throw new Error("Mapping ID is required to delete a stub.");
  }

  try {
    const response = await axios.delete(
      `${url_wiremock}/__admin/mappings/${mappingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get the content of a file from /__admin/roles
export const getFileContent = async () => {
  const url = `${getWiremockUrl()}/__admin/roles`;
  // const url = 'http://stay-wiremock-dev-01.rguest.com:8070/__admin/roles'
  try {
    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get file: ${error.message}`);
  }
};

// Update or create a file using PUT
export const postFileContent = async (content) => {
  const url = `${getWiremockUrl()}/__admin/roles`;
  // const url = 'http://stay-wiremock-dev-01.rguest.com:8070/__admin/roles'
  try {
    await axios.post(url, content, {
      headers: { "Content-Type": "application/json" },
    });
    return true;
  } catch (error) {
    console.log(`Failed to put file: ${error.message}`);
  }
};

// Update or create a file using PUT
export const putFileContent = async (content) => {
  const url = `${getWiremockUrl()}/__admin/roles`;
  //  const url = 'http://stay-wiremock-dev-01.rguest.com:8070/__admin/roles'
  try {
    await axios.put(url, content, {
      headers: { "Content-Type": "application/json" },
    });
    return true;
  } catch (error) {
    throw new Error(`Failed to put file: ${error.message}`);
  }
};

// Delete a file
export const deleteFile = async () => {
  const url = `${getWiremockUrl()}/__admin/roles`;
  try {
    await axios.delete(url);
    return true;
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
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

export const deleteRequestLog = async () => {
  const url_wiremock = getWiremockUrl();
  try {
    const response = await axios.post(`${url_wiremock}/__admin/requests/reset`);
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
