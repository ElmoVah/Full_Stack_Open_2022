import { useStateValue, setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import React from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";

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
      void fetchPatient();
    }
  }, [dispatch]);

  const genderImage = () => {
    switch (patient?.gender) {
      case "male":
        return (
          <MaleIcon />
        );
      case "female":
        return (
          <FemaleIcon />
        );
      default:
        return (
          <TransgenderIcon />
        );
    }
  };

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
        {patient.name}{genderImage()}
      </h2>
      <p>
        ssn: {patient.ssn} <br></br>
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientDetailsPage;