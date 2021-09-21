import React from "react";

import { CoursePart } from "../types";

interface Props {
  part: CoursePart
}

const Part = ({ part }: Props) => {
  console.log(part);

  const neverSayNever = (value: never): never => {
    throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
  };

  switch(part.type) {
    case "normal": {
      return (
        <p>
          <span><strong>{part.name} {part.exerciseCount}</strong></span><br />
          <span><i>{part.description}</i></span>
        </p>
      );
    }
    case "submission": {
      return (
        <p>
          <span><strong>{part.name} {part.exerciseCount}</strong></span><br />
          <span><i>{part.description}</i></span><br />
          <span>submit to {part.exerciseSubmissionLink}</span>
        </p>
      );
    }
    case "groupProject": {
      return (
        <p>
          <span><strong>{part.name} {part.exerciseCount}</strong></span><br />
          <span>group exercises: {part.groupProjectCount}</span>
        </p>
      );
    }
    case "special": {
      return (
        <p>
          <span><strong>{part.name} {part.exerciseCount}</strong></span><br />
          <span><i>{part.description}</i></span><br />
          <span>required skills: {part.requirements.join()}</span>
        </p>
      );
    }
    default:
      return neverSayNever(part);
  }
};

export default Part;