import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';


import { Patient, PublicPatient, NewPatient } from '../types';

const patients: Array<Patient> = [...(patientData as Array<Patient>)];

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatienById = ( id: string ): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);

  if (patient && !patient?.entries){
    patient.entries = [];
  }

  return patient;
};

export default {
  addPatient,
  getPublicPatients,
  getPatienById
};