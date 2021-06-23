import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import User from "./components/User"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  // helpers for new blogs
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

  // load all blogs from db
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // load user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // log in user
  const logInHandler = async (e) => {
    e.preventDefault()

    // console.log(username, password)

    try {
      const user = await loginService.logIn({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
    } 
    catch(error) {
      console.log("invalid login")
    }
  }

  // log out user
  const logOutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  // create new blog
  const createNewBlogHandler = async (e) => {
    e.preventDefault()

    // console.log("new blog handler submit btn")
    // console.log(newBlogTitle, newBlogAuthor, newBlogUrl)

    const newBlogObj = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try {
      const response = await blogService.createNewBlog(newBlogObj)
      console.log(response)
    } 
    catch (error) {
      console.log(error.message)
    }
  }

  if(user === null) {
    return (
      <div>
        <h2>log in</h2>
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

  return (
    <div>
      <h2>blogs</h2>
      <User name={user.name} logOut={logOutHandler}/>
      <br></br>
      <NewBlogForm 
        setNewBlogTitle={setNewBlogTitle}
        setNewBlogAuthor={setNewBlogAuthor}
        setNewBlogUrl={setNewBlogUrl} 
        createNewBlog={createNewBlogHandler}
        />
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App