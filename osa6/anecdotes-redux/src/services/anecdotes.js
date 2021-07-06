import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (anecdote) => {
  const anecdoteObj = {
    content: anecdote,
    votes: 0
  }

  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const anecdoteService = {
  getAnecdotes,
  createNewAnecdote
}

export default anecdoteService