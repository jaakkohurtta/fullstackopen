import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { updatePatient } from "../state";

const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patients }, dispatch] = useStateValue();

  // console.log(patients);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (e) {
        console.log(e.message);
      }
    };

    if (!patients[id].ssn) {
      void fetchPatient();
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
    </div>
  );
};

export default PatientPage;
