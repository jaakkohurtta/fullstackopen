import React from "react";
import { Form, Dropdown, DropdownProps } from "semantic-ui-react";

import { EntryType, NewEntry } from "../types";
import entryService from "../services/entries";
import { useStateValue, updatePatient } from "../state";

import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

const entryTypes: { value: EntryType; label: string }[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  {
    value: EntryType.OccupationalHealthcare,
    label: "Occupational Healthcare",
  },
];

interface Props {
  patient: string;
  setShowForm: (showForm: boolean) => void;
}

const AddJournalEntryForm = ({ patient, setShowForm }: Props) => {
  const [activeForm, setActiveForm] = React.useState(EntryType.HealthCheck);
  const [, dispatch] = useStateValue();

  const handleEntryTypeChange = (
    _e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ): void => {
    if (typeof data.value === "number") {
      setActiveForm(data.value);
    }
  };

  const handleNewJournalEntrySubmit = (values: NewEntry) => {
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
          <Dropdown
            fluid
            selection
            options={entryTypes.map((type) => ({
              key: type.label,
              text: type.label,
              value: type.value,
            }))}
            onChange={handleEntryTypeChange}
            defaultValue={EntryType.HealthCheck}
          />
        </Form.Field>
      </Form>
      <br />
      {
        {
          0: (
            <HealthCheckForm
              onSubmit={handleNewJournalEntrySubmit}
              onCancel={setShowForm}
            />
          ),
          1: (
            <HospitalForm
              onSubmit={handleNewJournalEntrySubmit}
              onCancel={setShowForm}
            />
          ),
          2: (
            <OccupationalHealthcareForm
              onSubmit={handleNewJournalEntrySubmit}
              onCancel={setShowForm}
            />
          ),
        }[activeForm]
      }
    </div>
  );
};

export default AddJournalEntryForm;
