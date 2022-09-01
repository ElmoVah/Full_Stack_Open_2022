import { useStateValue, setPatientDetails, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import React from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "./EntryDetails";
import { HealthCheckEntryFormValues } from "./AddHealthCheckModal/AddHealthCheckForm";
import AddHealthCheckModal from "./AddHealthCheckModal";
import { Button } from "@material-ui/core";

const PatientDetailsPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
  }, [patient, id, dispatch]);

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

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      if (patient) {
        const { data: newEntry } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        console.log({ newEntry });
        dispatch(addEntry(newEntry));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
      <AddHealthCheckModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Health Check Entry
      </Button>
    </div>
  );
};

export default PatientDetailsPage;