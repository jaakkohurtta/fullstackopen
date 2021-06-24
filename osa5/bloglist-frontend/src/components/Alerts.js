import React from "react"

const Alert = ({ message }) => {
  return (
    <div>
      {message ? message : ""}
    </div>
  )
}

export default Alert