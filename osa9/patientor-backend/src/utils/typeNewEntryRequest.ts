import { NewEntry } from "../types";
import {
  inputStringParser,
  inputDateParser,
  inputHealthCheckParser,
  inputDiagnoseParser,
  inputDischargeParser,
  inputSickLeaveParser,
} from "./inputParsers";

type InputFields = {
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes?: unknown[];
  healthCheckRating: unknown;
  employerName?: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

export const typeHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: InputFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "HealthCheck",
    description: inputStringParser(description),
    date: inputDateParser(date),
    specialist: inputStringParser(specialist),
    diagnosisCodes: inputDiagnoseParser(diagnosisCodes),
    healthCheckRating: inputHealthCheckParser(healthCheckRating),
  };

  return newEntry;
};

export const typeHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: InputFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "Hospital",
    description: inputStringParser(description),
    date: inputDateParser(date),
    specialist: inputStringParser(specialist),
    diagnosisCodes: inputDiagnoseParser(diagnosisCodes),
    discharge: inputDischargeParser(discharge),
  };

  return newEntry;
};

export const typeOccupationalHealthcareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave,
}: InputFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "OccupationalHealthcare",
    description: inputStringParser(description),
    date: inputDateParser(date),
    specialist: inputStringParser(specialist),
    diagnosisCodes: inputDiagnoseParser(diagnosisCodes),
    employerName: inputStringParser(employerName),
    sickLeave: inputSickLeaveParser(sickLeave),
  };

  return newEntry;
};
