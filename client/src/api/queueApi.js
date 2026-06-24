import axios from "axios";

const API =
  "http://localhost:5000/api/queue";

export const getQueue =
  async () => {
    const response =
      await axios.get(
        `${API}/queue`
      );

    return response.data;
  };

export const getSummary =
  async () => {
    const response =
      await axios.get(
        `${API}/summary`
      );

    return response.data;
  };

export const callNext =
  async () => {
    const response =
      await axios.post(
        `${API}/call-next`
      );

    return response.data;
  };

export const addPatient =
  async (patientData) => {
    const response =
      await axios.post(
        `${API}/add-patient`,
        patientData
      );

    return response.data;
  };
  export const completeConsultation =
  async () => {
    const response =
      await axios.put(
        `${API}/complete-consultation`
      );

    return response.data;
  };
  export const getDoctorQueue =
  async (doctorName) => {

    const response =
      await axios.get(
        `${API}/doctor/${doctorName}`
      );

    return response.data;
  };