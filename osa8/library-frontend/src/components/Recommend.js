import React, { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"

import { BOOKS_BY_GENRE } from "../queries"

const Recommend = ({ user }) => {
  // console.log(user.favouriteGenre)

  const [queryBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre: user.favouriteGenre }
  })

  useEffect(() => {
    if(user) {
      queryBooksByGenre()
    }
  }, [queryBooksByGenre, user])

  if(result.loading || !result.data) {
    return <div>Loading your personal recommendation..</div>
  }

  // console.log(result.data)
  const books = result.data.allBooks

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
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
