import React, { useState, useEffect } from "react"
import Toggler from "./Toggler"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
import PropTypes from "prop-types"

const UserControl = ({
  setUsername,
  setPassword,
  logInHandler,
  signUpUser,
  logInFormRef,
  signUpFormRef
}) => {

  const [activeForm, setActiveForm] = useState(null)

  useEffect(() => {
    if(activeForm === "LogIn") {
      signUpFormRef.current.hide()
    }
    if(activeForm === "SignUp") {
      logInFormRef.current.hide()
    }
  }, [activeForm, signUpFormRef, logInFormRef])

  return (
    <div>
      <Toggler
        buttonLabel="login >"
        buttonClasses="no-border-btn"
        buttonId="LogIn"
        cancelId="UserControl"
        setActiveForm={setActiveForm}
        ref={logInFormRef}
      >
        <LoginForm
          logInHandler={logInHandler}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Toggler>
      <div style={{ height: "5px" }}></div>
      <Toggler
        buttonLabel="sign up >"
        buttonClasses="no-border-btn"
        buttonId="SignUp"
        cancelId="UserControl"
        setActiveForm={setActiveForm}
        ref={signUpFormRef}
      >
        <SignUpForm
          signUpUser={signUpUser}
        />
      </Toggler>
    </div>
  )
}

UserControl.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  logInHandler: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired
}

export default UserControl
