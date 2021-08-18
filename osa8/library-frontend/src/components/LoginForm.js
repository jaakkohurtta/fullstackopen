import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../queries"

const LoginForm = ({ setAlert, setToken, setPage  }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginUser, result] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setAlert(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      // console.log(result.data)
      const token = result.data.loginUser.value
      setToken(token)
      localStorage.setItem("libraryapp-user-token", token)
      setPage("authors")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleSubmit = async (e) => {
    e.preventDefault()

    loginUser({ variables: { username, password }})
  
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>username&nbsp;</label>
        <input type="text" onChange={({ target }) => setUsername(target.value)} required />
      </div>
      <div>
        <label>password&nbsp;</label>
        <input type="password" onChange={({ target }) => setPassword(target.value)} required />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
