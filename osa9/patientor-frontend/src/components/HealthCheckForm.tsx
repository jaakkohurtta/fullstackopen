import React from "react";
import { Formik, Field, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientFormModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { TextField, NumberField } from "../AddPatientFormModal/FormField";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
  onCancel: (showForm: boolean) => void;
}

const HealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (isNaN(Date.parse(values.date))) {
          errors.date = "Invalid date format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "HealthCheck") {
          if (
            !Object.values(HealthCheckRating).includes(values.healthCheckRating)
          ) {
            errors.healthCheckRating = "Invalid health check rating";
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="button"
                  onClick={() => onCancel(false)}
                  color="red"
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckForm;
