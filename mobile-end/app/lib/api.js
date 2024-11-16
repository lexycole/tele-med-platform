import { create } from 'apisauce';
import * as SecureStore from 'expo-secure-store';

export const tokenCache = {
  async getToken(key) {
    try {
      const token = await SecureStore.getItemAsync(key);
      console.log(`Getting token for key: ${key}`, token ? 'Token found' : 'No token found');
      return token;
    } catch (err) {
      console.error("Error getting token:", err);
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      console.log(`Attempting to save token with key: ${key} and value: ${value}`);
      await SecureStore.setItemAsync(key, value);
      console.log(`Token saved successfully with key: ${key}`);
    } catch (err) {
      console.error("Error saving token:", err);
    }
  },

  async deleteToken(key) {
    try {
      console.log(`Attempting to delete token with key: ${key}`);
      await SecureStore.deleteItemAsync(key);
      console.log(`Token deleted successfully for key: ${key}`);
    } catch (err) {
      console.error("Error removing token:", err);
    }
  }
};

const apiClient = create({
  baseURL: 'http://localhost:8080/api'
});


const refreshToken = async (getToken) => {
  try {
    const newToken = await getToken();
    if (newToken) {
      await tokenCache.saveToken('auth_token', newToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

// Modify the response transform to accept getToken
apiClient.addResponseTransform(async (response) => {
  if (response.status === 401) {
    const refreshed = await refreshToken(response.config.getToken);
    if (refreshed) {
      return apiClient(response.config);
    }
  }
  return response;
});

// apiClient.addResponseTransform(async (response) => {
//   if (response.status === 401) {
//     const refreshed = await refreshToken();
//     if (refreshed) {
//       // Retry the original request
//       return apiClient(response.config);
//     }
//   }
//   return response;
// });

// // Add a response interceptor to handle token expiration
// apiClient.addResponseTransform(response => {
//   if (response.status === 401) {
//     // Handle token expiration
//     // You might want to redirect to login or refresh the token
//     console.log('Token expired or invalid');
//     // Optionally clear the token
//     tokenCache.deleteToken('auth_token');
//   }
//   return response;
// });

export const setAuthToken = (token) => {
  apiClient.setHeader('Authorization', `Bearer ${token}`);
};

// 01
export const getCountries = () => apiClient.get('/countries');
// 02.
// New COA functions integrated into lib/api.js
const endpointCOAs = '/coas';

// Fetch the list of COAs
export const getCOAs = () => apiClient.get(endpointCOAs);

// Add a new COA with form data
export const addCOA = (coa, imageSrc) => {
  const formData = new FormData();
  const body = { ...coa };

  // Append each key-value pair to the formData
  for (let key in body) {
    formData.append(key, body[key]);
  }

  // Append the image source separately
  formData.append('imageSrc', imageSrc);

  return apiClient.post(endpointCOAs, formData);
};

// Patient APIs
const endpointPatients = "/patients";

// Fetch all patients
export const getPatients = () => apiClient.get(endpointPatients);

// Fetch a single patient by ID
export const getPatient = (id) => apiClient.get(`${endpointPatients}/${id}`);

// Fetch a patient by user ID
export const getPatientByUser = (userId) => apiClient.get(`${endpointPatients}/user/${userId}`);

// Add a new patient
// export const addPatient = (data) => apiClient.post(`${endpointPatients}/create`, data);
// Update an existing patient
export const updatePatient = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'imageSrc' && data[key].startsWith('file://')) {
      const uriParts = data[key].split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: data[key],
        name: `image.${fileType}`,
        type: `image/${fileType}`
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  return apiClient.put(`${endpointPatients}/${id}/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Add a new patient
export const addPatient = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'imageSrc' && data[key].startsWith('file://')) {
      const uriParts = data[key].split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append('image', {
        uri: data[key],
        name: `image.${fileType}`,
        type: `image/${fileType}`
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  return apiClient.post(`${endpointPatients}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// export const savePatient = async (data) => {
//   console.log('Data to save:', data);

//   if (data._id) {
//     const id = data._id;
//     delete data._id;
//     return updatePatient(id, data);
//   }

//   return addPatient(data);
// };

export const savePatient = async (data) => {
  console.log('Data to save:', data);

  try {
    // Get the saved token
    const token = await tokenCache.getToken('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'imageSrc' && data[key]?.startsWith('file://')) {
        const uriParts = data[key].split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: data[key],
          name: `image.${fileType}`,
          type: `image/${fileType}`
        });
      } else if (data[key] != null) {
        formData.append(key, data[key]);
      }
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    if (data._id) {
      const id = data._id;
      delete data._id;
      return await apiClient.put(`${endpointPatients}/${id}/update`, formData, config);
    }

    return await apiClient.post(`${endpointPatients}/create`, formData, config);
    
  } catch (error) {
    console.error('Error in savePatient endpoint:', error);
    throw error;
  }
};

// export const savePatient = async (data, getToken) => {
//   console.log('Data to save:', data);
  
//   const formData = new FormData();
//   Object.keys(data).forEach(key => {
//     if (key === 'imageSrc' && data[key]?.startsWith('file://')) {
//       const uriParts = data[key].split('.');
//       const fileType = uriParts[uriParts.length - 1];
//       formData.append('image', {
//         uri: data[key],
//         name: `image.${fileType}`,
//         type: `image/${fileType}`
//       });
//     } else if (data[key] != null) {
//       formData.append(key, data[key]);
//     }
//   });

//   // Add getToken to the config
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     getToken,
//   };

//   if (data._id) {
//     const id = data._id;
//     delete data._id;
//     return apiClient.put(`${endpointPatients}/${id}/update`, formData, config);
//   }

//   return apiClient.post(`${endpointPatients}/create`, formData, config);
// };

// Update the apiClient configuration
apiClient.addRequestTransform(async (request) => {
  if (request.config?.getToken) {
    const token = await request.config.getToken();
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    const token = await tokenCache.getToken('auth_token');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
  }
});

export { apiClient };