import React from "react"

const Alert = ({ message, type }) => {
  const alertStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "5px",
    backgroundColor: type === "alert" ? "#fffafa" : "#fafffa",
    border: type === "alert" ? "2px solid #ffcccc" : "2px solid #ccffcc"
  }

  if(message) {
    return <div style={alertStyle}>{message}</div>
  } else {
    return <div></div>
  }
}

export default Alert