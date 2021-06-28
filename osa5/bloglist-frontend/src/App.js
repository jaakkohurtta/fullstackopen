import React, { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Header from "./components/Header"
import Alert from "./components/Alerts"
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
    async function getBlogs() {
      const blogsData = await blogService.getAll()
      setBlogs(blogsData)
    }
    getBlogs()
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
      displayAlert({ message: `${user.name} logged in.`, type: "info" })
    } 
    catch(error) {
      console.log("invalid login")
      displayAlert({ message: "Invalid username or password.", type: "alert" })
    }
  }

  // log out user
  const logOutHandler = () => {
    displayAlert({ message: `${user.name} logged out.`, type: "info" })
    setUser(null)
    window.localStorage.clear()
  }

  // create new blog
  const postNewBlog = async (newBlog) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      const response = await blogService.createNewBlog(newBlog)
      // console.log(response)
      displayAlert({ message: `"${response.title}" by ${response.author} added to database.`, type: "info"})

      // get updated blog list
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } 
    catch(error) {
      console.log(error.message)
    }
  }

  const likeBlog = async (id, likedBlog) => {
    //console.log(id, likedBlog)

    try {
      const response = await blogService.updateBlog(id, likedBlog)
      // console.log(response)  
      displayAlert({ message: `You liked ${response.title} by ${response.author}!`, type: "info" })

      // get updated blog list
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } 
    catch(error) {
      console.log(error.message)
    }
  }

  const displayAlert = (message) => {
    setAlert(message)

    setTimeout(() => {
      setAlert({ message: null })
    }, 3000)
  }

  return (
    <div className="container">
      <Header
        user={user}
        logOutHandler={logOutHandler}
        logInHandler={logInHandler}
        setUsername={setUsername}
        setPassword={setPassword} 
        />
      <Alert 
        message={alert.message}
        type={alert.type}
        />
      {user
        ? <Blogs 
            blogs={blogs}
            postNewBlog={postNewBlog}
            likeBlog={likeBlog}
            newBlogFormRef={newBlogFormRef}
            />
        : <div className="info-message">Please log in to view and manage blogs</div>
        }
    </div>
  )
}

export default App