import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: {
        id: string;
        entry: Entry;
      };
    }
  | {
      type: "GET_DIAGNOSIS_CODES";
      payload: Diagnosis[];
    };

export const setPatientList = (patientList: Patient[]) => {
  return <Action>{
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const setPatient = (patient: Patient) => {
  return <Action>{
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (id: string, entry: Entry) => {
  return <Action>{
    type: "UPDATE_PATIENT",
    payload: {
      id,
      entry,
    },
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]) => {
  return <Action>{
    type: "GET_DIAGNOSIS_CODES",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      state.patients[action.payload.id].entries.push(action.payload.entry);

      return {
        ...state,
      };
    case "GET_DIAGNOSIS_CODES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
