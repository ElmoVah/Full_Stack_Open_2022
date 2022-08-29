import { Entry } from "../types";
import { assertNever } from "../utlis";

const EntryDetails: React.FC<{entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return null;
    case 'OccupationalHealthcare':
      return null;
    case 'HealthCheck':
      return null;
    default:
      return assertNever(entry);    
  }
};

export default EntryDetails;