import React from "react"

const Course = ({ course }) => {
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
  return (
    <div>
      {course.parts.map(part => (
        <Part 
          key={part.id} 
          name={part.name} 
          exercises={part.exercises} 
          />
      ))}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ course }) => {
  /*
  let totalExercises = 0;
  course.parts.forEach(part => {
    totalExercises += part.exercises
  })
  */

  const totalExercises = course.parts.reduce((sum, part) => {   
    // console.log("sum", sum)
    // console.log("part", part)

    return sum + part.exercises
  }, 0)

  return (
    <p><strong>Number of excersices {totalExercises}</strong></p>
  )
}

export default Course