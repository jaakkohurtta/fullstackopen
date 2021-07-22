import React from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import { setUser } from "../reducers/userReducer"
import { setAlert } from "../reducers/alertReducer"

// eslint-disable-next-line no-undef
const app_env = process.env.REACT_APP_ENVIRONMENT

const User = ({ user }) => {
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(setAlert({
      message: `${user.name} logged out.`,
      type: "info",
      duration: 4
    }))
    dispatch(setUser(null))

    if(app_env !== "production") {
      window.localStorage.clear()
    }
  } // Log Out Handler

  return (
    <span id="user">
      Logged in as {user.name}&nbsp;
      <button className="no-border-btn" onClick={logOutHandler}>logout</button>
    </span>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
