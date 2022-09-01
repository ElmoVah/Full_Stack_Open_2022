import { HospitalEntry } from "../../types";
import Diagnoses from "./../Diagnoses";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

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
          {entry.date} <LocalHospitalIcon />
        </p>
        <p>
          {entry.description}
        </p>
        {entry.diagnosisCodes
          ? <Diagnoses diag={entry.diagnosisCodes} />
          : null}
        {entry.discharge
          ? <p>
            discharged: {entry.discharge.date} <br></br>
            discharge criteria: {entry.discharge.criteria}
          </p>
          : null}
        <p>
          diagnose by {entry.specialist}
        </p>
      </div>
    </div>
  );
};

export default Hospital;