import React, { useState } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"

import { BOOKS_BY_GENRE, ALL_BOOKS } from "../queries"

const Books = ({ show, genres }) => {
  const [filter, setFilter] = useState(null)
 
  const queryAllBooksResult = useQuery(ALL_BOOKS)

  const [queryBooksByGenre, queryBooksByGenreResult]
    = useLazyQuery(BOOKS_BY_GENRE, 
      {
        variables: { genre: filter }, 
        fetchPolicy: "no-cache" 
      },
    )
 
  if(!show) {
    return null
  }
  
  if (queryAllBooksResult.loading || queryBooksByGenreResult.loading) {
    return <div>Loading...</div>
  }

  const handleClick = (genre) => {
    setFilter(genre)
    queryBooksByGenre()
  }

  const booksByGenre = !filter
    ? queryAllBooksResult.data.allBooks
    : queryBooksByGenreResult.data.allBooks
 
  return (
    <div>
      <h2>books</h2>
      <p>in&nbsp;
        {!filter 
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
          {booksByGenre
            /* legacy-koodia osasta 8.19
            .filter(book => book.genres
            .find(genre => genre === (filter !== "" ? filter : genre)))
            */
            .map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setFilter(null)}>all genres</button>
      {genres.map(genre =>
        <button 
          key={genre}
          onClick={() => handleClick(genre)}
        >
          {genre}
        </button>)}
    </div>
  )
}

export default Books