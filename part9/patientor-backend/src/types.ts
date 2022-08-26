export interface IDiagnose {
  code: string,
  name: string,
  latin?: string
}

export interface IPatient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NonSensitivePatient = Omit<IPatient, "ssn">;

export type NewPatient = Omit<IPatient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}