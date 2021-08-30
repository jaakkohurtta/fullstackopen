import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { useStateValue, setPatientList, setDiagnosis } from "./state";
import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void patientService.ping();
    patientService
      .getPatientList()
      .then((res) => dispatch(setPatientList(res)))
      .catch((error) => {
        console.error(error.response?.data || "Unknown Error");
      });
    diagnosisService
      .getDiagnosis()
      .then((res) => dispatch(setDiagnosis(res)))
      .catch((error) => {
        console.error(error.response?.data || "Unknown Error");
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patient/:id">
              <PatientPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
