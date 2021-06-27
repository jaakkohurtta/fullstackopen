import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
import Alert from "./components/Alerts"
import Toggler from "./components/Toggler"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [alert, setAlert] = useState({ message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  // load all blogs from db
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs)
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
      displayAlert({ message: `${user.name} logged in.` })
    } 
    catch(error) {
      console.log("invalid login")
      displayAlert({ message: "Invalid username or password." })
    }
  }

  // log out user
  const logOutHandler = () => {
    displayAlert({ message: `${user.name} logged out.` })
    setUser(null)
    window.localStorage.clear()
  }

  // create new blog
  const postNewBlog = async (newBlog) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      const response = await blogService.createNewBlog(newBlog)
      // console.log(response)
      displayAlert({ message: `"${response.title}" by ${response.author} added to database.`})

      // get updated blog list
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } 
    catch (error) {
      console.log(error.message)
    }
  }

  const displayAlert = (message) => {
    setAlert(message)

    setTimeout(() => {
      setAlert({ message: null })
    }, 3000)
  }

  const loginForm = () => {
    return (
      <LoginForm 
      logInHandler={logInHandler} 
      setUsername={setUsername}
      setPassword={setPassword}
      />
    )
  }

  const newBlogForm = () => {
    return (
      <NewBlogForm postNewBlog={postNewBlog} />
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Alert message={alert.message} />
      {user === null ?
        <Toggler buttonLabel="login">
          {loginForm()} 
        </Toggler> :
        <div>
          <User name={user.name} logOut={logOutHandler}/>
          <Toggler buttonLabel="post new blog" ref={newBlogFormRef}>
            {newBlogForm()}
          </Toggler>
          <h3>blogs</h3>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App