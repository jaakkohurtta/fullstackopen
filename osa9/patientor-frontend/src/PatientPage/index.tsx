import React from "react";
import { useParams } from "react-router-dom";
import { Icon, Header, Divider, Item } from "semantic-ui-react";

import { useStateValue } from "../state";
import patientService from "../services/patients";
import { setPatient } from "../state";

import JournalEntry from "../components/JournalEntry";

const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();

  // console.log(patients);

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
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <br />
      <Divider />
      {patient.entries && (
        <Item.Group>
          {patient.entries.length > 0 ? (
            <Header as="h3">Patient journal</Header>
          ) : (
            <></>
          )}
          {patient.entries.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
        </Item.Group>
      )}
    </div>
  );
};

export default PatientPage;
