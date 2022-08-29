import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

interface EntriesProps {
  entries: Array<Entry>
}

const Entries: React.FC<EntriesProps> = ({ entries }) => {
  const [{ diagnosis }] = useStateValue();

  const findDescription = (code: string): string => {
    const diag = Object.values(diagnosis).find((diag: Diagnosis) => diag.code === code);
    if (!diag) return '';
    return diag.name;
  };

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
              {code} {findDescription(code)}
            </li>
          ))}
        </ul>
      </div>
    ))}</div>
  );
};

export default Entries;