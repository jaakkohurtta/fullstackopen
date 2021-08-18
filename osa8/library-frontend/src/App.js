import React, { useState, useEffect } from "react"
import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import AddBook from "./components/AddBook"
import Recommend from "./components/Recommend"
import LoginForm from "./components/LoginForm"

import { WHO_AM_I, BOOK_ADDED, ALL_BOOKS } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [alertMsg, setAlertMsg] = useState("")
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded 
      showAlert(`${addedBook.title} by ${addedBook.author.name} added to library.`)
      updateApolloCache(addedBook)
    }
  })

  const { refetch } = useQuery(WHO_AM_I)

  useEffect(() => {
    const queryUserAfterLogin = async () => {
      const result = await refetch()
      setUser(result.data.me)
    }
    queryUserAfterLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const updateApolloCache = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }  
  }

  const showAlert = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => {
      setAlertMsg("")
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    setUser(null)
    setPage("authors")
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
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={() => logOut()}>logout</button>
            </span>
        }
        
      </div>
      
      {page === "authors" && 
        <Authors
          setAlert={showAlert}
          token={token}
        />      
      }

      {page === "books" &&
        <Books />      
      }

      {page === "login" &&
        <LoginForm
          setAlert={showAlert}
          setToken={setToken}
          setPage={setPage}
        />      
      }

      {page === "add" &&
        <AddBook
          setAlert={showAlert}
          updateApolloCache={updateApolloCache}
        />      
      }

      {page === "recommend" &&
      <Recommend 
        token={token}
        user={user}
      />       
      }

    </div>
  )
}

export default App