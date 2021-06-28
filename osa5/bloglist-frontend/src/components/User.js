import React from "react"

const User = ({ name, logOut }) => {
  return (
    <span>
      Logged in as {name}&nbsp;
      <button onClick={logOut}>logout</button>
    </span>
  )
}

export default User
