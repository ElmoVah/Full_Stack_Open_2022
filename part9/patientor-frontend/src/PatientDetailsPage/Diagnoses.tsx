import { useStateValue } from "../state";
import { Diagnosis } from "../types";

interface DiagnosesProps {
  code: string
}

const Diagnoses: React.FC<DiagnosesProps> = ({ code }) => {
  const [{ diagnosis }] = useStateValue();
  
  const findDescription = (code: string): string => {
    const diag = Object.values(diagnosis).find((diag: Diagnosis) => diag.code === code);
    if (!diag) return '';
    return diag.name;
  };

  return (
    <>
      {code} {findDescription(code)}
    </>
  );
};

export default Diagnoses;