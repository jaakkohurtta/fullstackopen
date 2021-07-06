import React from "react"
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (e) => {
    e.preventDefault()

    // console.log(e.target.newAnecdote.value)
    const content = e.target.newAnecdote.value
    const newAnecdote = await anecdoteService.createNewAnecdote(content)  
    console.log(newAnecdote)
    dispatch(addNewAnecdote(newAnecdote))

    dispatch(setNotification(`Added "${newAnecdote.content}" to anecdotes.`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000) // remove notification after 5 secs

    e.target.reset()
  }

  return (
    <div>
      <div><strong>create new</strong></div>
      <form onSubmit={createNewAnecdote}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm
