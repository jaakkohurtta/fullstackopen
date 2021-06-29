import React from "react"
import PropTypes from "prop-types"

const User = ({ name, logOut }) => {
  return (
    <span>
      Logged in as {name}&nbsp;
      <button onClick={logOut}>logout</button>
    </span>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired
}

export default User
