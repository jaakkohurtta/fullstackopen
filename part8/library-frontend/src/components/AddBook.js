import React, { useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from "../queries"

const AddBook = ({ show, setAlert, updateApolloCache }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_GENRES }
      // { query: ALL_BOOKS }
    ],
    update: (store, response) => {
      updateApolloCache("allBooks", ALL_BOOKS, response.data.addBook)
    },
    onError: (error) => {
      // console.log(error)
      setAlert(error.graphQLErrors[0].message)
    }
  })

  if(!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    createBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres
      }
    })

    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <h2>add new book to database</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(" ")}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default AddBook
