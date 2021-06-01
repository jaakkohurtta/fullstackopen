import React from "react"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  // Newschool
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} /> 
      ))}
    </div>
  )

  /* Oldschool
  return (
    <div>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
  )
  */
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ course }) => {
  return (
    <p>Number of excersices {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
  )
}

export default App