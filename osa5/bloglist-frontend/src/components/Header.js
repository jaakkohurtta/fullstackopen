import React from "react"
import User from "./User"

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

export default Header
