import { v1 as uuidv1 } from "uuid";
import patients from "../../data/patients";

import { Patient, NewPatient, CensoredPatient } from "../types";

// const patients: Patient[] = patientData as Patient[];

const getData = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): CensoredPatient[] => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  // console.log(patient);
  return patient;
};

const createNewPatient = (patientObj: NewPatient) => {
  const newPatient: Patient = {
    id: uuidv1(),
    ...patientObj,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getData,
  getNonSensitiveData,
  getPatientById,
  createNewPatient,
};
