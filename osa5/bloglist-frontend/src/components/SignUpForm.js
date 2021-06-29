import React, { useState } from "react"

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
      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
      <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit">sign up</button>
    </form>
  )
}

export default SignUpForm
