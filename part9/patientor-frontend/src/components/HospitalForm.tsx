import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientFormModal/FormField";
import { HospitalEntry } from "../types";
import { TextField } from "../AddPatientFormModal/FormField";

interface Props {
  onSubmit: (values: Omit<HospitalEntry, "id">) => void;
  onCancel: (showForm: boolean) => void;
}

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (isNaN(Date.parse(values.date))) {
          errors.date = "Invalid date format";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date || !values.discharge.criteria) {
          errors.discharge = "Discharge date and criteria are required";
        }
        if (isNaN(Date.parse(values.discharge.date))) {
          errors.discharge = "Invalid discharge date format";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, errors }) => {
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
            <Grid style={{ marginBottom: "1px" }}>
              <Grid.Column width={8}>
                <Field
                  label="Discharge date"
                  placeholder="Discharge date"
                  name="discharge.date"
                  component={TextField}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </Grid.Column>
            </Grid>
            {errors.discharge ? (
              <div style={{ color: "red", transform: "translateY(-14px)" }}>
                {errors.discharge}
              </div>
            ) : null}
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

export default HospitalForm;
