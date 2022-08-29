import { Entry } from "../types";
import Diagnoses from "./Diagnoses";

interface EntriesProps {
  entries: Array<Entry>
}

const Entries: React.FC<EntriesProps> = ({ entries }) => {
  return (
    <div>
      <h2>entries</h2>
      {entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>
            {entry.date}
          </p>
          <p>
            {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code: string) => (
              <li key={code}>
                <Diagnoses code={code} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Entries;