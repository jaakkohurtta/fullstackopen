import React from 'react'

const LoginForm = ({ logInHandler, setUsername, setPassword }) => {
  return (
    <div>
      <h3>log in</h3>
      <form onSubmit={logInHandler}>
        <div>
          <label>username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div>
          <label>password: </label>
          <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm
