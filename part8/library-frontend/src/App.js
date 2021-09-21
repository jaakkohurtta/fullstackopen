import React, { useState, useEffect } from "react"
import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import AddBook from "./components/AddBook"
import Recommend from "./components/Recommend"
import LoginForm from "./components/LoginForm"

import { WHO_AM_I, BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, NEW_AUTHOR, ALL_GENRES } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [alertMsg, setAlertMsg] = useState("")
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const whoAmI = useQuery(WHO_AM_I)
  const allGenres = useQuery(ALL_GENRES)
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData}) => {
      const newBook = subscriptionData.data.bookAdded 
      showAlert(`${newBook.title} by ${newBook.author.name} added to library.`)
      updateApolloCache("allBooks", ALL_BOOKS, newBook)
      allGenres.refetch()
    }
  })

  useSubscription(NEW_AUTHOR, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newAuthor = subscriptionData.data.newAuthor
      updateApolloCache("allAuthors", ALL_AUTHORS, newAuthor)
    } 
  })

  useEffect(() => {
    const queryUserAfterLogin = async () => {
      if(token) {
        const result = await whoAmI.refetch()
        setUser(result.data.me)
      }
    }
    queryUserAfterLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const updateApolloCache = (cache, query, update) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)  
    
    const dataInStore = client.readQuery({ query })
    const data = {}
    data[cache] = dataInStore[cache].concat(update)

    // console.log("updateApolloCache data:", data)

    if (!includedIn(dataInStore[cache], update)) {
      client.writeQuery({ query, data })
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
      
      <Authors
        show={page === "authors"}
        setAlert={showAlert}
        token={token}
      />

      <Books
        show={page === "books"} 
        genres={!allGenres.loading ? allGenres.data.allGenres : ["all genres"]}       
      />            

      <LoginForm
        show={page === "login"}
        setAlert={showAlert}
        setToken={setToken}
        setPage={setPage}
      />      

      <AddBook
        show={page === "add"}
        setAlert={showAlert}
        updateApolloCache={updateApolloCache}
      />      
      
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