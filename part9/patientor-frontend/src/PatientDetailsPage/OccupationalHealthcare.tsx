import { OccupationalHealthcareEntry } from "../types";
import Diagnoses from "./Diagnoses";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <div>
      <div key={entry.id} style={
        {
          border: '3px solid black',
          padding: '15px',
          borderRadius: '10px'
        }
      }>
        <p>
          {entry.date} <MedicalInformationIcon /> {entry.employerName}
        </p>
        <p>
          {entry.description}
        </p>
        {entry.diagnosisCodes
          ? <Diagnoses diag={entry.diagnosisCodes} />
          : null}
        {entry.sickLeave 
          ? <p>
            start date: {entry.sickLeave.startDate} <br></br>
            end date: {entry.sickLeave.endDate}
          </p>
          : null}
        <p>
          diagnose by {entry.specialist}
        </p>
      </div>
    </div>
  );
};

export default OccupationalHealthcare;