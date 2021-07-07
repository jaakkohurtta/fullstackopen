import React, { useEffect } from "react"
// import anecdoteService from "./services/anecdotes"
import { initAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"

const App = () => {
  const dispatch = useDispatch()

  // get anecdotes from db
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App