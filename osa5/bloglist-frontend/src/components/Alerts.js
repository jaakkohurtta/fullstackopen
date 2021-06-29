import React from "react"
import PropTypes from "prop-types"


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

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Alert