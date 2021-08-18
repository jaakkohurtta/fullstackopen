import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const Authors = ({ setAlert, token }) => {
  const [author, setAuthor] = useState("")
  const [birthYear, setBirthYear] = useState("")

  const result = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      // console.log(error)
      setAlert(error.graphQLErrors[0].message)
    }
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  const handleUpdateAuthor = () => {
    // console.log(author, birthYear)

    updateAuthor({
      variables: {
        name: author,
        birthYear: parseInt(birthYear)
      }
    })
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token && 
        <div>
          <h2>set birthyear</h2>
          <select onChange={({ target }) => setAuthor(target.value)}>
            {authors.map(a => <option key={a.name}>{a.name}</option>)}
          </select>
          <input type="text" placeholder="birth year" onChange={({ target }) => setBirthYear(target.value)} /> 
          <button onClick={() => handleUpdateAuthor()}>update author</button>
        </div>
      }
    </div>
  )
}

export default Authors