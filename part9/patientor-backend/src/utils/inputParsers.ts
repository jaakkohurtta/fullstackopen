import {
  Gender,
  HealthCheckRating,
  Diagnose,
  DischargeObj,
  SickLeaveObj,
} from "../types";

import diagnosesData from "../../data/diagnoses.json";
const diagnosis: Array<Diagnose> = diagnosesData;

const isString = (input: unknown): input is string => {
  return typeof input === "string" || input instanceof String;
};

const isObject = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" || input instanceof Object;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (params: any): params is Gender => {
  return Object.values(Gender).includes(params);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (params: any): params is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(params);
};

const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

export const inputStringParser = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error("Incorrect or missing content");
  }
  return input;
};

export const inputGenderParser = (input: unknown): Gender => {
  if (!input || !isGender(input)) {
    throw new Error("Incorrect or missing gender");
  }
  return input;
};

export const inputHealthCheckParser = (input: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(input)) {
    throw new Error("Incorrect health check rating");
  }
  return input;
};

export const inputDateParser = (input: unknown): string => {
  if (!input || !isString(input) || !isDate(input)) {
    throw new Error(`Incorrect or missing date: ${input}`);
  }
  return input;
};

export const inputDiagnoseParser = (
  input: unknown[] | undefined
): Array<Diagnose["code"]> | undefined => {
  if (!input) {
    return undefined;
  }
  if (
    !input.every((i) => isString(i)) ||
    !input.every((i) => diagnosis.find((d) => d.code === i))
  ) {
    throw new Error("Incorrect diagnosis codes");
  }

  return input as Array<Diagnose["code"]>;
};

export const inputDischargeParser = (input: unknown): DischargeObj => {
  if (
    !isObject(input) ||
    !Object.keys(input).includes("date") ||
    !Object.keys(input).includes("criteria")
  ) {
    throw new Error("Invalid discharge info");
  }
  if (
    !isString(input.date) ||
    !isDate(input.date) ||
    !isString(input.criteria)
  ) {
    throw new Error("Invalid discharge info");
  }

  return {
    date: input.date,
    criteria: input.criteria,
  };
};

export const inputSickLeaveParser = (
  input: unknown | undefined
): SickLeaveObj | undefined => {
  if (!input) {
    return undefined;
  }
  if (
    !isObject(input) ||
    !Object.keys(input).includes("startDate") ||
    !Object.keys(input).includes("endDate")
  ) {
    throw new Error("Invalid sickleave info");
  }
  if (
    !isString(input.startDate) ||
    !isDate(input.startDate) ||
    !isString(input.endDate) ||
    !isDate(input.endDate)
  ) {
    throw new Error("Invalid sickleave info");
  }

  return {
    startDate: input.startDate,
    endDate: input.endDate,
  };
};
