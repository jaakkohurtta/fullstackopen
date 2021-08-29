import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { useStateValue } from "../state";
import { patientService } from "../services/patients";
import { setPatient } from "../state";

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
  console.log(patient.entries);

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
      {patient.entries &&
        patient.entries.map((entry) => (
          <div key={entry.id}>
            <h3>entries</h3>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PatientPage;
