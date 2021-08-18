import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"

import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"

const Books = () => {
  const [filter, setFilter] = useState("")
  const result = useQuery(ALL_BOOKS)

  const [queryBooksByGenre, queryBooksByGenreResult]
    = useLazyQuery(BOOKS_BY_GENRE, { variables: { genre: filter }})
  // console.log(result)

  useEffect(() => {
    queryBooksByGenre()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  if (result.loading || queryBooksByGenreResult.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  let filteredBooks
  if(filter !== "") {
    filteredBooks = queryBooksByGenreResult.data.allBooks
  }

  const genres = ["all genres"]
  books.forEach(book => {
    book.genres.forEach(genre => {
      if(!genres.find(g => g === genre)) {
        genres.push(genre)
      }
    })
  })

  const booksToDisplay = filter === "" ? books : filteredBooks

  return (
    <div>
      <h2>books</h2>
      <p>in {filter === "" 
                ? <strong>all genres</strong>
                : <span>genre <strong>{filter}</strong></span>
                }
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToDisplay
            /* legacy-koodia osasta 8.19
            .filter(book => book.genres
            .find(genre => genre === (filter !== "" ? filter : genre)))
            */
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button 
          key={genre}
          onClick={() => setFilter(genre !== "all genres" ? genre : "")}
        >
          {genre}
        </button>)}
    </div>
  )
}

export default Books