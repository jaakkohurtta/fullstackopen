import React, { useState, useEffect, useRef } from "react"
import Toggler from "./Toggler"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"

const UserControl = () => {

  const [activeForm, setActiveForm] = useState(null)
  const signUpFormRef = useRef()
  const logInFormRef = useRef()

  useEffect(() => {
    if(activeForm === "LogIn") {
      signUpFormRef.current.hide()
    }
    if(activeForm === "SignUp") {
      logInFormRef.current.hide()
    }
    if(!activeForm) {
      signUpFormRef.current.hide()
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
        <LoginForm />
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
        <SignUpForm setActiveForm={setActiveForm} />
      </Toggler>
    </div>
  )
}

export default UserControl
