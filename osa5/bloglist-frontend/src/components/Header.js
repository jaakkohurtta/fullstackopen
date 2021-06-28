import React from "react"
import User from "./User"
import Toggler from "./Toggler"
import LoginForm from "./LoginForm"

const Header = ({ user, logOutHandler, logInHandler, setUsername, setPassword }) => {
  return (
    <header>
      <span className="header-title">Bloglist</span>
      {user
        ? 
        <User name={user.name} logOut={logOutHandler} />
        : 
        <Toggler buttonLabel="login">
          <LoginForm 
            logInHandler={logInHandler} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            />
        </Toggler> }
    </header>
  )
}

export default Header
