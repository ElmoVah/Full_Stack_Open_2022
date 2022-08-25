import diagnoseData from '../../data/diagnoses.json';

import { IDiagnose } from '../types';

const diagnoses: Array<IDiagnose> = diagnoseData;

const getDiagnoses = (): Array<IDiagnose> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};