import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const ping = async () => {
  await axios.get<void>(`${apiBaseUrl}/ping`);
};

const getPatientList = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getPatientData = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addNewPatient = async (newPatient: Omit<Patient, "id" | "entries">) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatient
  );
  return data;
};

const patientService = {
  ping,
  getPatientList,
  getPatientData,
  addNewPatient,
};

export default patientService;
