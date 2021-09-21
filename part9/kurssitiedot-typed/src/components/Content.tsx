import React from "react";

import Part from "./Part";

import { CoursePart } from "../types";

interface Props {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;