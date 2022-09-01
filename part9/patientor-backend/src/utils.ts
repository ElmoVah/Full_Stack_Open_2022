import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge, Diagnosis, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  };
  return newPatient;
};

const pareseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const pareseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthChechRating = (rating: unknown): HealthCheckRating => {
  if (rating === null || rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing Health check rating: ' + rating);
  }
  return rating;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name');
  }
  return name;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge | undefined => {

  if (!discharge) return undefined;

  discharge as Discharge;

  if (!discharge.date) {
    throw new Error("Incorrect or missing discharge date");
  }

  if (!discharge.criteria) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseDischargeCriteria(discharge.criteria),
  };
};

const parseDiagnosisCode = (diagnosisCode: unknown): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCode) return undefined;

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosis codes list");
  }

  const codesString = diagnosisCode.some(code => typeof code !== "string");

  if (codesString) {
    throw new Error("Incorrect diagnosis code");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCode;
};

const parseSickLeave = (sickleave: any): SickLeave | undefined => {
  if (!sickleave) return undefined;

  if (!sickleave.startDate) {
    throw new Error("Incorrect or missing sickleave start date");
  }

  if (!sickleave.endDate) {
    throw new Error("Incorrect or missing sickleave end date");
  }

  return {
    startDate: parseDate(sickleave.startDate),
    endDate: parseDate(sickleave.endDate)
  };
};

export const toNewEntry = (object: any): NewEntry => {
  if (!object || !object.type) {
    throw new Error('Incorrect or missing entry: ' + object);
  }

  switch (object.type) {
    case 'Hospital':
      return {
        date: parseDate(object.date),
        type: "Hospital",
        specialist: pareseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCode(object?.diagnosisCodes),
        description: pareseDescription(object.description),
        discharge: parseDischarge(object?.discharge),
      };
    case 'HealthCheck':
      return {
        date: parseDate(object.date),
        type: "HealthCheck",
        specialist: pareseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCode(object?.diagnosisCodes),
        description: pareseDescription(object.description),
        healthCheckRating: parseHealthChechRating(object.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        date: parseDate(object.date),
        type: "OccupationalHealthcare",
        specialist: pareseSpecialist(object.specialist),
        description: pareseDescription(object.description),
        employerName: parseEmployerName(object.employerName),
        diagnosisCodes: parseDiagnosisCode(object?.diagnosisCodes),
        sickLeave: parseSickLeave(object?.sickLeave)
      };
    default:
      throw new Error("Incorrect entry: " + object);
  }

};

export default {
  toNewEntry,
  toNewPatient
};