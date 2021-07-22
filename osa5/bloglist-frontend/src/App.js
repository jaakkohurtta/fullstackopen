import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { setUser } from "./reducers/userReducer"
import { getBlogs } from "./reducers/blogsReducer"

import Blogs from "./components/Blogs"
import Header from "./components/Header"
import Alert from "./components/Alerts"
import UserControl from "./components/UserControl"
import blogService from "./services/blogs"

// eslint-disable-next-line no-undef
const app_env = process.env.REACT_APP_ENVIRONMENT

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getBlogs())
  }, []) // Load all blogs from db on page load

  if(app_env === "development") {
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")

      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
        blogService.setToken(user.token)
      }
    }, []) // if in dev environment load user from local storage
  }

  return (
    <div className="container">
      <Header />
      <Alert />
      {user
        ? <Blogs />
        : <UserControl />
      }
    </div>
  )
}

export default App