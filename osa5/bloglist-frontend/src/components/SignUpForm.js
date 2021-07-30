import React, { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"

import { setAlert } from "../reducers/alertReducer"
import signupService from "../services/signup"

import { Button, Input, Form, InputGroup } from "../theme/styledComponents"

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
    <Form inline onSubmit={signUpHandler}>
      <InputGroup inline>
        <Input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <InputGroup inline>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup inline>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <Button id="submitSignupBtn" type="submit">sign up</Button>
    </Form>
  )
}

SignUpForm.propTypes = {
  setActiveForm: PropTypes.func.isRequired
}

export default SignUpForm
