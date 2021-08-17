import React, { useState } from "react"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState("")
  const result = useQuery(ALL_BOOKS)
  // console.log(result)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  const genres = ["all genres"]
  books.forEach(book => {
    book.genres.forEach(genre => {
      if(!genres.find(g => g === genre)) {
        genres.push(genre)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>
      <div>in {filter === "" 
                ? <strong>all genres</strong>
                : <span>genre <strong>{filter}</strong></span>
                }
      </div>
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
            .filter(book => book.genres
            .find(genre => genre === (filter !== "" ? filter : genre)))
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