import patientData from '../../data/patients.json';

import { IPatient, NonSensitivePatient } from '../types';

const patients: Array<IPatient> = patientData;

const getPatients = (): Array<IPatient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addDiagnose = () => {
  return null;
};

export default {
  getPatients,
  addDiagnose,
  getNonSensitivePatients
};