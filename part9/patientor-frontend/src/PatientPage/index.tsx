import React from "react";
import { useParams } from "react-router-dom";
import { Icon, Header, Divider, Item, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import patientService from "../services/patients";
import { setPatient } from "../state";

import JournalEntry from "../components/JournalEntry";
import AddJournalEntryForm from "../components/AddJournalEntryForm";

const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();

  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    if (!patients[id].ssn) {
      patientService
        .getPatientData(id)
        .then((res) => dispatch(setPatient(res)))
        .catch((error) => {
          console.error(error.response?.data || "Unknown Error");
        });
    }
  }, [dispatch]);

  const patient = patients[id];

  return (
    <div className="App">
      <h2>
        {patient.name}
        {patient.gender === "male" && <Icon name="mars" />}
        {patient.gender === "female" && <Icon name="venus" />}
        {patient.gender === "other" && <Icon name="genderless" />}
      </h2>
      <div>
        <strong>ssn:</strong> {patient.ssn}
      </div>
      <div>
        <strong>occupation:</strong> {patient.occupation}
      </div>
      <br />
      <Divider />
      <Header as="h3">
        Patient journal&nbsp;
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add entry</Button>
        )}
      </Header>
      {showForm && (
        <AddJournalEntryForm patient={patient.id} setShowForm={setShowForm} />
      )}
      {patient.entries && (
        <Item.Group>
          {patient.entries
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((entry) => (
              <JournalEntry key={entry.id} entry={entry} />
            ))}
        </Item.Group>
      )}
    </div>
  );
};

export default PatientPage;
