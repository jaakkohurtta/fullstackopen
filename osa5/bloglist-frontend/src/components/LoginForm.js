import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { setUser } from "../reducers/userReducer"
import { setAlert } from "../reducers/alertReducer"
import loginService from "../services/login"
import blogService from "../services/blogs"

// eslint-disable-next-line no-undef
const app_env = process.env.REACT_APP_ENVIRONMENT

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const logInHandler = async (e) => {
    e.preventDefault()

    // console.log(username, password)
    try {
      const user = await loginService.logIn({ username, password })
      dispatch(setUser(user))
      blogService.setToken(user.token)

      // If app environment !production store user to local storage
      if(app_env !== "production") {
        window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      }

      dispatch(setAlert({
        message: `${user.name} logged in.`,
        type: "info",
        duration: 4
      }))
    }
    catch(error) {
      console.log(error.message)

      dispatch(setAlert({
        message: "Invalid username or password.",
        type: "alert",
        duration: 4
      }))
    }
  } // Log In Handler

  return (
    <form style={{ display: "inline" }} onSubmit={logInHandler}>
      <input
        id="loginUsernameInput"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="loginPasswordInput"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="loginBtn" type="submit">log in</button>
    </form>
  )
}

export default LoginForm
