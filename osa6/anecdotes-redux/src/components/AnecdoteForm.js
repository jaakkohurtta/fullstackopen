import React from "react"
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = (e) => {
    e.preventDefault()

    // console.log(e.target.newAnecdote.value)
    dispatch(addNewAnecdote(e.target.newAnecdote.value))

    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm
