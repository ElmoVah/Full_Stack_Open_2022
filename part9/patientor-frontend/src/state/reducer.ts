import { State } from "./state";
import { Patient, Diagnosis } from "../types";

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
    type: "SET_PATIENT_DETAILS";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  };

export const setPatientList = (patients: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patient
  };
};

export const setDiagnosis = (diagnosis: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: diagnosis
  };
};

export const addEntry = (patient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
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
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diag) => ({ ...memo, [diag.code]: diag }),
            {}
          ),
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: action.payload,
      };
    default:
      return state;
  }
};
