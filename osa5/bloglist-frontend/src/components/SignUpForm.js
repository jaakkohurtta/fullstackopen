import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { setAlert } from "../reducers/alertReducer"
import signupService from "../services/signup"

const SignUpForm = ({ setActiveForm }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const signUpHandler = async (e) => {
    e.preventDefault()

    const newUserObj = {
      name,
      username,
      password
    }

    try {
      const response = await signupService.newUser(newUserObj)
      dispatch(setAlert({
        message: `${response.username} signed up succesfully.`,
        type: "info",
        duration: 4
      }))
      setActiveForm(null)
    }
    catch(error) {
      console.log(error.message)
      dispatch(setAlert({
        message: "Sign up failed!",
        type: "alert",
        duration: 4
      }))
    }

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
  setActiveForm: PropTypes.func.isRequired
}

export default SignUpForm
