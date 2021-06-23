import React from "react"

const User = ({ name, logOut }) => {
  return (
    <div>
      {name} logged in
      <button onClick={logOut}>logout</button>
    </div>
  )
}

export default User
