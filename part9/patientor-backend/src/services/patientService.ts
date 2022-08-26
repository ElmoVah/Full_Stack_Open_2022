import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';


import { IPatient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<IPatient> = [...(patientData as Array<IPatient>)];

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

const addPatient = ( patient: NewPatient): IPatient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients
};