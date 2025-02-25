import axios from 'axios';

// Base URL for the API
const API_URL = 'https://json-placeholder.mock.beeceptor.com'; // Replace with your actual API URL


const hasResponse = (error: any): error is { response: { data: any } } => {
  return error && typeof error === 'object' && 'response' in error;
}

// Login function
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Return the response data
  } catch (error) {
    if (hasResponse(error)) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Example function to logout (if needed)
export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    if (hasResponse(error)) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Example function to verify OTP (if 2FA is required)
export const verifyOTP = async (otp: string) => {
  try {
    const response = await axios.get(`${API_URL}/roles`); //TODO:  need to remove
    // const response = await axios.post(`${API_URL}/verify-otp`, { otp }); //TODO: verify-otp need to implement in server
    return response.data; // Return the response data
  } catch (error) {
    if (hasResponse(error)) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Example function to get user details after login
export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data; // Return the user data
  } catch (error) {
    if (hasResponse(error)) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};