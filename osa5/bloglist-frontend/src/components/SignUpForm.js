import React, { useState } from "react"
import PropTypes from "prop-types"

const SignUpForm = ({ signUpUser }) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const signUpHandler = (e) => {
    e.preventDefault()

    const newUserObj = {
      name,
      username,
      password
    }

    signUpUser(newUserObj)

    e.target.reset()
  }

  return (
    <form style={{ display: "inline" }} onSubmit={signUpHandler}>
      <input id="signupName" type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
      <input id="signupUsername" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
      <input id="signupPassword" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
      <button id="submitSignupBtn" type="submit">sign up</button>
    </form>
  )
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func.isRequired
}

export default SignUpForm
