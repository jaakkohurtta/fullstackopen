import React from 'react'

const LoginForm = ({ logInHandler, setUsername, setPassword }) => {
  return (
    <span>
      <form style={{display:"inline"}} onSubmit={logInHandler}>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit">log in</button>
      </form>
    </span>
  )
}

export default LoginForm
