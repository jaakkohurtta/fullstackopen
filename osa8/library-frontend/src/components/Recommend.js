import React, { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"

import { BOOKS_BY_GENRE } from "../queries"

const Recommend = ({ user }) => {
  // console.log(user.favouriteGenre)

  const [queryBooksByGenre, queryBooksByGenreResult]
    = useLazyQuery(BOOKS_BY_GENRE,
      {
        variables: { genre: user.favouriteGenre },
        fetchPolicy: "no-cache"
      }
    )

  useEffect(() => {
    if(user) {
      queryBooksByGenre()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if(queryBooksByGenreResult.loading || !queryBooksByGenreResult.data) {
    return <div>Loading your personal recommendation..</div>
  }
  
  const books = queryBooksByGenreResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <strong>{user.favouriteGenre}</strong></p>
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
          {books
            .map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
