import axios from "axios";

const API =
  "https://your-render-backend.onrender.com/api/auth";

export const registerUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/register`,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {

    const response =
      await axios.post(
        `${API}/login`,
        userData
      );

    return response.data;
  };
  export const forgotPassword =
  async (email) => {

    const response =
      await axios.post(
        "https://your-render-backend.onrender.com/api/auth/forgot-password",
        { email }
      );

    return response.data;
  };

export const resetPassword =
  async (
    token,
    password
  ) => {

    const response =
      await axios.put(
        `https://your-render-backend.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );

    return response.data;
  };