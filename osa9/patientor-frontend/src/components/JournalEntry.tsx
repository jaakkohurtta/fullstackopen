import React from "react";
import { Item, Icon, SemanticCOLORS } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Entry } from "../types";

interface Props {
  entry: Entry;
}

enum healthRatingColors {
  green,
  yellow,
  orange,
  red,
}

const itemStyle = {
  borderLeft: "1px solid lightgray",
  padding: "5px",
  margin: "10px 0",
};

const JournalEntry = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const neverSayNever = (value: never): never => {
    throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case "HealthCheck":
      const healthColorValue = healthRatingColors[entry.healthCheckRating];
      return (
        <Item style={itemStyle}>
          <Item.Content>
            <Item.Header as="h4">
              {entry.date} <Icon name="user md" size="large" />
            </Item.Header>
            <Item.Description>{entry.description}</Item.Description>
            <Item.Extra>
              <Icon
                color={healthColorValue as SemanticCOLORS}
                name="heart"
                size="huge"
              />
              {entry.diagnosisCodes && <div>Diagnosis codes</div>}
              {entry.diagnosisCodes?.map((code) => (
                <div key={code} style={{ paddingLeft: "20px" }}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </div>
              ))}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    case "Hospital":
      return (
        <Item style={itemStyle}>
          <Item.Content>
            <Item.Header as="h4">
              {entry.date} <Icon name="hospital" size="large" />
            </Item.Header>
            <Item.Description>{entry.description}</Item.Description>
            <Item.Extra>
              {entry.diagnosisCodes && <div>Diagnosis codes</div>}
              {entry.diagnosisCodes?.map((code) => (
                <div key={code} style={{ paddingLeft: "20px" }}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </div>
              ))}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    case "OccupationalHealthcare":
      return (
        <Item style={itemStyle}>
          <Item.Content>
            <Item.Header as="h4">
              {entry.date} <Icon name="stethoscope" size="large" />{" "}
              {entry.employerName}
            </Item.Header>
            <Item.Description>
              <div>{entry.description}</div>
            </Item.Description>
            <Item.Extra>
              {entry.diagnosisCodes && <div>Diagnosis codes</div>}
              {entry.diagnosisCodes?.map((code) => (
                <div key={code} style={{ paddingLeft: "20px" }}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </div>
              ))}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    default:
      return neverSayNever(entry);
  }
};

export default JournalEntry;
