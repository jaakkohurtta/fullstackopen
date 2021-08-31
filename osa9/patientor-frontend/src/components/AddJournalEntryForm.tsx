import React from "react";
import { Form } from "semantic-ui-react";

import { JournalEntryOption } from "../AddPatientFormModal/FormField";
import { EntryTypes } from "../types";
import entryService from "../services/entries";
import { useStateValue, updatePatient } from "../state";

import HealthCheckForm, { HealthCheckFormValues } from "./HealthCheckForm";

const journalEntryOptions: JournalEntryOption[] = [
  { value: EntryTypes.HealthCheck, label: "HealthCheck" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  {
    value: EntryTypes.OccupationalHealthcare,
    label: "Occupational Healthcare",
  },
];

interface Props {
  patient: string;
  setShowForm: (showForm: boolean) => void;
}

const AddJournalEntryForm = ({ patient, setShowForm }: Props) => {
  const [activeForm, setActiveForm] = React.useState(EntryTypes.HealthCheck);
  const [, dispatch] = useStateValue();

  const handleEntryTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setActiveForm(e.target.selectedIndex);
  };

  const handleNewHealthCheckEntrySubmit = (values: HealthCheckFormValues) => {
    console.log(values);

    entryService
      .addNewJournalEntry(patient, values)
      .then((res) => {
        dispatch(updatePatient(patient, res));
      })
      .catch((error) => console.error(error.response?.data || "Unknown Error"));

    setShowForm(false);
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Select Journal Entry Type</label>
          <select onChange={(e) => handleEntryTypeChange(e)}>
            {journalEntryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </select>
        </Form.Field>
      </Form>
      {
        {
          0: <HealthCheckForm onSubmit={handleNewHealthCheckEntrySubmit} />,
          1: <div>Hospital</div>,
          2: <div>Occupational Healthcare</div>,
        }[activeForm]
      }
    </div>
  );
};

export default AddJournalEntryForm;
