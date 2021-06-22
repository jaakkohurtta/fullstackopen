import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import User from "./components/User"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logUserIn = async (e) => {
    e.preventDefault()

    // console.log(username, password)

    try {
      const user = await loginService.logIn({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
    } 
    catch(error) {
      console.log("invalid login")
    }
  }

  if(user === null) {
    return (
      <div>
        <h2>log in</h2>
        <form onSubmit={logUserIn}>
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

  return (
    <div>
      <h2>blogs</h2>
      <User name={user.name} />
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App