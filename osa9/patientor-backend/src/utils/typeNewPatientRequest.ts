import { NewPatient, Gender } from "../types";

const isString = (input: unknown): input is string => {
  return typeof input === "string" || input instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (params: any): params is Gender => {
  return Object.values(Gender).includes(params);
};

const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

const inputStringParser = (input: unknown): string => {
  if(!input || !isString(input)) {
    throw new Error("Incorrect or missing content");
  }
  return input;
};

const inputGenderParser = (input: unknown): Gender => {
  if(!input || !isGender(input)) {
    throw new Error("Incorrect or missing gender");
  }
  return input;
};

const inputDateParser = (input: unknown): string => {
  if(!input || !isString(input) || !isDate(input)) {
    throw new Error(`Incorrect or missing date: ${input}`);
  }
  return input;
};

type InputFields = {
  name: unknown,
  ssn: unknown,
  dateOfBirth: unknown,
  gender: unknown,
  occupation: unknown
};

const typeNewPatient = ({ name, ssn, dateOfBirth, gender, occupation }: InputFields): NewPatient => {
  const newPatient: NewPatient = {
    name: inputStringParser(name),
    dateOfBirth: inputDateParser(dateOfBirth),
    ssn: inputStringParser(ssn),
    gender: inputGenderParser(gender),
    occupation: inputStringParser(occupation)
  };
  
  return newPatient;
};

export default typeNewPatient;