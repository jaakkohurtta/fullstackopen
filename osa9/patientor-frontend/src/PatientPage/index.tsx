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
