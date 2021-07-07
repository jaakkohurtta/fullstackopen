import React from "react"
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (e) => {
    e.preventDefault()

    // console.log(e.target.newAnecdote.value)
    const content = e.target.newAnecdote.value
    dispatch(addNewAnecdote(content))
    dispatch(setNotification(`Added "${content}" to anecdotes.`, 5))

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
