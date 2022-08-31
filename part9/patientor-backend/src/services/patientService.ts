import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';


import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';

const patients: Array<Patient> = patientData;

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

const addEntry = (patientId: string, newEntry: NewEntry): Patient | undefined => {

  const patient = patients.find(patient => patient.id === patientId);

  if(!patient) return undefined;

  const entry = {
    id: uuid(),
    ...newEntry
  };

  console.log(entry);

  patient.entries.push(entry);
  return patient;
};

export default {
  addPatient,
  getPublicPatients,
  getPatienById,
  addEntry
};