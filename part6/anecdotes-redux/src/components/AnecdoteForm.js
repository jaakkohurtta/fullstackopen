import React from "react"
import { connect } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const createNewAnecdote = async (e) => {
    e.preventDefault()

    // console.log(e.target.newAnecdote.value)
    const content = e.target.newAnecdote.value
    props.addNewAnecdote(content)
    props.setNotification(`Added "${content}" to anecdotes.`, 5)

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

const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (value, duration) => {
      dispatch(setNotification(value, duration))
    },
    addNewAnecdote: (value) => {
      dispatch(addNewAnecdote(value))
    }
  }
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm
