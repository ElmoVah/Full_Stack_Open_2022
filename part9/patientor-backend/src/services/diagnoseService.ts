import diagnoseData from '../../data/diagnoses.json';

import { IDiagnoseEntry } from '../types';

const diagnoses: Array<IDiagnoseEntry> = diagnoseData;

const getEntries = (): Array<IDiagnoseEntry> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};