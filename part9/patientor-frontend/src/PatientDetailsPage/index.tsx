import { useStateValue, setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import React from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import axios from "axios";
import Entries from "./Entries";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

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
    console.log(patient?.gender);
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
          <TransgenderIcon/>
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
        gender: {patient.gender}<br></br>
        ssn: {patient.ssn} <br></br>
        occupation: {patient.occupation}
      </p>
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientDetailsPage;