import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const Diagnoses: React.FC<{diag: Array<Diagnosis['code']>}> = ({ diag }) => {
  const [{ diagnosis }] = useStateValue();

  const findDescription = (code: string): string => {
    const diag = Object.values(diagnosis).find((diag: Diagnosis) => diag.code === code);
    if (!diag) return '';
    return diag.name;
  };

  return (
    <ul>
      {diag.map((code: string) => (
        <li key={code}>
          {code} {findDescription(code)}
        </li>
      ))}
    </ul>

  );
};

export default Diagnoses;