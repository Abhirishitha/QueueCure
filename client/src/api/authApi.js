import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

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
        "http://localhost:5000/api/auth/forgot-password",
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
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

    return response.data;
  };