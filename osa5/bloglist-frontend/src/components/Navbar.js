import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { setUser } from "../reducers/userReducer"
import { setAlert } from "../reducers/alertReducer"

// eslint-disable-next-line no-undef
const app_env = process.env.REACT_APP_ENVIRONMENT

const Navbar = ({ user }) => {
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
    <nav>
      <span>
        <Link className="mr-5" to="/">home</Link>
        <Link className="mr-5" to="/users">users</Link>
      </span>
      <span>
        Logged in as {user.name}&nbsp;
        <button className="no-border-btn" onClick={logOutHandler}>logout</button>
      </span>
    </nav>
  )
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Navbar
