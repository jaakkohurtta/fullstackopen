import React from "react"
import Course from "./Course"
import { courses } from "./courses"

const App = () => {
  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App