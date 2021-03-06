import React from "react";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientFormModal/AddPatientForm";
import AddPatientFormModal from "../AddPatientFormModal";
import { Patient } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { setPatient } from "../state";
import patientService from "../services/patients";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = (values: PatientFormValues) => {
    patientService
      .addNewPatient(values)
      .then((res) => {
        dispatch(setPatient(res));
        closeModal();
      })
      .catch((error) => {
        console.error(error.response?.data || "Unknown Error");
        setError(error.response?.data?.error || "Unknown error");
      });
  };

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patient/${patient.id}`}>{patient.name}</Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientFormModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
