import React from "react"
import User from "./User"
import PropTypes from "prop-types"

const Header = ({ user, logOutHandler }) => {
  return (
    <header>
      <span className="header-title">Bloglist</span>
      {user
        ? <User name={user.name} logOut={logOutHandler} />
        : <></>
      }
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logOutHandler: PropTypes.func.isRequired
}

export default Header
