import { v1 as uuidv1 } from "uuid";
import patientData from "../../data/patients.json";

import { Patient, NewPatient, CensoredPatient } from "../types";

const patients: Patient[] = patientData as Patient[];

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

const createNewPatient = (patientObj: NewPatient) => {
  const newPatient: Patient = {
    id: uuidv1(),
    ...patientObj
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getData,
  getNonSensitiveData,
  createNewPatient
};