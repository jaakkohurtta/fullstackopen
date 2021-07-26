import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom"

import { getBlogs } from "./reducers/blogsReducer"

import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Header from "./components/Header"
import Alert from "./components/Alerts"
import UserControl from "./components/UserControl"
import Users from "./components/Users"
import User from "./components/User"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getBlogs())
  }, []) // Load all blogs from db on page load

  return (
    <div className="container">
      <Router>
        <Header />
        <Alert />
        <Switch>
          <Route path="/users/:id">
            {user ? <User /> : <Redirect to="/" />}
          </Route>
          <Route path="/users">
            {user ? <Users /> : <Redirect to="/" />}
          </Route>
          <Route path="/blogs/:id">
            {user ? <Blog /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            {user
              ? <Blogs />
              : <UserControl />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App