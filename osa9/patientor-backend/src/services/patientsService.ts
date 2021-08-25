import patients from "../../data/patients.json";

import { Patient, CensoredPatient } from "../types";

const getData = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): CensoredPatient[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

export default {
  getData,
  getNonSensitiveData
};