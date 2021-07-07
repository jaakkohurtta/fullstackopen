import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const anecdoteObj = {
    content: content,
    votes: 0
  }

  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  // console.log(anecdote)

  const updatedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }

  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  // console.log(response.data)
  return response.data
}

const anecdoteService = {
  getAnecdotes,
  createNewAnecdote,
  updateAnecdote
}

export default anecdoteService