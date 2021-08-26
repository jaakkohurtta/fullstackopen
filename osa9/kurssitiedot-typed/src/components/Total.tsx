import React from "react";

interface Props {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Total = ({ courseParts }: Props) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>  
  );
};

export default Total;
