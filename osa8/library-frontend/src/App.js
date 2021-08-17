import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import LoginForm from "./components/LoginForm"

const App = () => {
  const [page, setPage] = useState("authors")
  const [alertMsg, setAlertMsg] = useState("")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const showAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => {
      setAlertMsg("")
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    setPage("books")
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {alertMsg !== "" ? <div style={{ color: "red", margin: "10px 0" }}>{alertMsg}</div> : <></>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token 
          ? 
            <button onClick={() => setPage("login")}>login</button>
          : 
            <span>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => logOut()}>logout</button>
            </span>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        setAlert={showAlert}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <LoginForm
        show={page === "login"}
        setAlert={showAlert}
        setToken={setToken}
        setPage={setPage}
      />

      <AddBook
        show={page === 'add'}
        setAlert={showAlert}
      />

    </div>
  )
}

export default App