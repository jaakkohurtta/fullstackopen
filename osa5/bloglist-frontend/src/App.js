import React, { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Header from "./components/Header"
import Alert from "./components/Alerts"
import UserControl from "./components/UserControl"
import blogService from "./services/blogs"
import loginService from "./services/login"
import signupService from "./services/signup"

// eslint-disable-next-line no-undef
const app_env = process.env.REACT_APP_ENVIRONMENT

const App = () => {
  const [alert, setAlert] = useState({ message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()
  const signUpFormRef = useRef()
  const logInFormRef = useRef()

  useEffect(() => {
    getBlogs()
  }, []) // Load all blogs from db on page load

  // if not in production load user from local storage
  if(app_env !== "production") {
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")

      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, []) // Load user from local storage
  }

  //#region User Control
  const logInHandler = async (e) => {
    e.preventDefault()

    // console.log(username, password)

    try {
      const user = await loginService.logIn({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)

      // If app environment !production store user to local storage
      if(app_env !== "production") {
        window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      }

      displayAlert({ message: `${user.name} logged in.`, type: "info" })
    }
    catch(error) {
      console.log(error.message)
      displayAlert({ message: "Invalid username or password.", type: "alert" })
    }
  } // Log In Handler

  const logOutHandler = () => {
    displayAlert({ message: `${user.name} logged out.`, type: "info" })
    setUser(null)
    if(app_env !== "production") {
      window.localStorage.clear()
    }
  } // Log Out Handler

  const signUpUser = async (newUserObject) => {
    try {
      signUpFormRef.current.toggleVisibility()
      const response = await signupService.newUser(newUserObject)
      displayAlert({
        message: `${response.username} signed up succesfully.`,
        type: "info"
      })
    }
    catch(error) {
      console.log(error.message)
      displayAlert({
        message: "Sign up failed!",
        type: "alert"
      })
    }
  } // Sign Up New User
  //#endregion

  //#region Blog Control
  const handleNewBlogFormSubmit = async (e, newBlog) => {
    e.preventDefault()
    // console.log(newBlog)

    try {
      e.target.reset()
      newBlogFormRef.current.toggleVisibility()

      const response = await blogService.createNewBlog(newBlog)
      // console.log(response)
      displayAlert({ message: `"${response.title}" by ${response.author} added to database.`, type: "info" })
      // get updated blog list
      getBlogs()
    }
    catch(error) {
      console.log(error.message)
    }
  } // Create new blog

  const handleBlogLikeButton = async (blog) => {
    // console.log(blog)

    const likedBlog = {
      user: blog.userId.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes += 1
    }

    try {
      const response = await blogService.updateBlog(blog.id, likedBlog)
      // console.log(response)
      displayAlert({
        message: `You liked ${response.title} by ${response.author}!`,
        type: "info"
      })

      // get updated blog list
      getBlogs()
    }
    catch(error) {
      console.log(error.message)
    }
  } // Update blog likes

  const handleBlogDeleteButton = async (blog) => {
    if(window.confirm(`Delete "${blog.title}"?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        displayAlert({
          message: `"${blog.title}" deleted.`,
          type: "alert"
        })

        // get updated blog list
        getBlogs()
      }
      catch(error) {
        console.log(error.message)
      }
    }
  } // Delete blog from db

  const getBlogs = async () => {
    const allBlogs = await blogService.getBlogs()
    setBlogs(allBlogs)
  } // Helper to get all blogs from db
  //#endregion

  const displayAlert = (message) => {
    setAlert(message)

    setTimeout(() => {
      setAlert({ message: null, type: null })
    }, 4000)
  } // Display alert message in UI

  return (
    <div className="container">
      <Header
        user={user}
        logOutHandler={logOutHandler}
      />
      <Alert
        message={alert.message}
        type={alert.type}
      />
      {user
        ?
        <Blogs
          blogs={blogs}
          handleNewBlogFormSubmit={handleNewBlogFormSubmit}
          handleBlogLikeButton={handleBlogLikeButton}
          handleBlogDeleteButton={handleBlogDeleteButton}
          newBlogFormRef={newBlogFormRef}
          user={user}
        />
        :
        <UserControl
          setUsername={setUsername}
          setPassword={setPassword}
          logInHandler={logInHandler}
          signUpUser={signUpUser}
          logInFormRef={logInFormRef}
          signUpFormRef={signUpFormRef}
        />
      }
    </div>
  )
}

export default App