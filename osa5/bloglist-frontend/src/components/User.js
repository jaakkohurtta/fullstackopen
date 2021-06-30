import React from "react"
import PropTypes from "prop-types"

const User = ({ name, logOut }) => {
  return (
    <span id="user">
      Logged in as {name}&nbsp;
      <button className="no-border-btn" onClick={logOut}>logout</button>
    </span>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired
}

export default User
