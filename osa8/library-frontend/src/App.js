import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [alertMsg, setAlertMsg] = useState("")

  const showAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => {
      setAlertMsg("")
    }, 5000)
  }

  return (
    <div>
      {alertMsg !== "" ? <div style={{ color: "red", margin: "10px 0" }}>{alertMsg}</div> : <></>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        setAlert={showAlert}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setAlert={showAlert}
      />

    </div>
  )
}

export default App