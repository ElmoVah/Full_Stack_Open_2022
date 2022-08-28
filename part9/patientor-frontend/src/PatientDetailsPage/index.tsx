import { useStateValue, setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import React from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import axios from "axios";

const PatientDetailsPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient.id !== id) {
      console.log('patient data fetched');
      void fetchPatient();
    }
  }, [dispatch]);

  if (!patient) {
    return (
      <div>
        Error...
      </div>
    );
  }

  return (
    <div>
      <h2>
        {patient.name}
      </h2>
      <p>
        gender: {patient.gender}<br></br>
        ssn: {patient.ssn} <br></br>
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
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
              {code}
            </li>
          ))}
        </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDetailsPage;