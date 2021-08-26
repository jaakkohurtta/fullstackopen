import React from "react";

interface Props {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Content = ({ courseParts }: Props) => {
  return (
    <div>
        {courseParts.map(part =>
          <p key={part.name}>{part.name} {part.exerciseCount}</p>
        )}
    </div>
  );
};

export default Content;