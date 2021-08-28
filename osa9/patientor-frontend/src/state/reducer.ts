import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const setPatientList = (patientList: Patient[]) => {
  return <Action>{
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const addPatient = (patient: Patient) => {
  return <Action>{
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (patient: Patient) => {
  return <Action>{
    type: "UPDATE_PATIENT",
    payload: patient,
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
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      state.patients[action.payload.id] = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};
