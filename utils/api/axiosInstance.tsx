// api/axiosInstance.ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
  baseURL: 'https://0690-2001-448a-1041-b140-4946-36c2-ce20-5bc3.ngrok-free.app/',
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const response = await axios.post(
          'YOUR_API_URL/auth/refresh-token',
          {},
          { withCredentials: true }
        );

        // Save new access token
        if (response.data.accessToken) {
          await SecureStore.setItemAsync('accessToken', response.data.accessToken);
        }

        // Update Authorization header
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        
        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear storage and redirect to login
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        
        // Navigate to login (implement based on your navigation setup)
        // For example:
        // navigation.replace('Login');
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;