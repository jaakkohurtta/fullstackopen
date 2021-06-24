import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import User from "./components/User"
import Alert from "./components/Alerts"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [alert, setAlert] = useState({ message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  // state handling for new blog
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")

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
      clearNewBlogForm()

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

  const clearNewBlogForm = () => {
    // clear html
    document.getElementById("newBlogTitle").value = ""
    document.getElementById("newBlogAuthor").value = ""
    document.getElementById("newBlogUrl").value = ""

    // clear state
    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogUrl("")
  }

  if(user === null) {
    return (
      <div>
        <h2>Bloglist 9000</h2>
        <Alert message={alert.message} />
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

  return (
    <div>
      <h2>Bloglist 9000</h2>
      <Alert message={alert.message} />
      <User name={user.name} logOut={logOutHandler}/>
      <h3>post new blog</h3>
      <NewBlogForm 
        setNewBlogTitle={setNewBlogTitle}
        setNewBlogAuthor={setNewBlogAuthor}
        setNewBlogUrl={setNewBlogUrl} 
        createNewBlog={createNewBlogHandler}
        />
      <h3>blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App