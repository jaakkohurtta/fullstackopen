import React from "react"
import PropTypes from "prop-types"


const LoginForm = ({ logInHandler, setUsername, setPassword }) => {
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

LoginForm.propTypes = {
  logInHandler: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
