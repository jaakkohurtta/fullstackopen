import { NewPatient } from "../types";
import {
  inputStringParser,
  inputDateParser,
  inputGenderParser,
} from "./inputParsers";

type InputFields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
};

const typeNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  gender,
  occupation,
}: InputFields): NewPatient => {
  const newPatient: NewPatient = {
    name: inputStringParser(name),
    dateOfBirth: inputDateParser(dateOfBirth),
    ssn: inputStringParser(ssn),
    gender: inputGenderParser(gender),
    occupation: inputStringParser(occupation),
    entries: [],
  };

  return newPatient;
};

export default typeNewPatient;
