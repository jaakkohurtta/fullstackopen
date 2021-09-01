import React from "react";
import { Field, Formik, Form } from "formik";
import { Button, Grid } from "semantic-ui-react";

import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientFormModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { TextField } from "../AddPatientFormModal/FormField";

interface Props {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, "id">) => void;
  onCancel: (showForm: boolean) => void;
}
const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
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
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (
          values.sickLeave?.startDate &&
          isNaN(Date.parse(values.sickLeave.startDate))
        ) {
          errors.sickLeave = "Invalid sick leave start date format";
        }
        if (
          values.sickLeave?.endDate &&
          isNaN(Date.parse(values.sickLeave.endDate))
        ) {
          errors.sickLeave = "Invalid sick leave end date format";
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
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Grid style={{ marginBottom: "1px" }}>
              <Grid.Column width={8}>
                <Field
                  label="Sick leave start date"
                  placeholder="Sick leave start date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                {errors.sickLeave && errors.sickLeave.includes("start") ? (
                  <div style={{ color: "red", transform: "translateY(-14px)" }}>
                    {errors.sickLeave}
                  </div>
                ) : null}
              </Grid.Column>
              <Grid.Column width={8}>
                <Field
                  label="Sick leave end date"
                  placeholder="Sick leave end date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                {errors.sickLeave && errors.sickLeave.includes("end") ? (
                  <div style={{ color: "red", transform: "translateY(-14px)" }}>
                    {errors.sickLeave}
                  </div>
                ) : null}
              </Grid.Column>
            </Grid>
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

export default OccupationalHealthcareForm;
