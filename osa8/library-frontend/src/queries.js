import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }   
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title
      published
      genres
      id
      author {
        name
      }
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      id
      author {
        name
      }
    }
  }
`


export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
      ) {
      title
      author {
        name
        bookCount
      }
      published
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $birthYear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $birthYear
    ) {
      name,
      born
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const WHO_AM_I = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      id
      author {
        name
        born
        bookCount
        id
      }
    }
  }
`

export const NEW_AUTHOR = gql`
  subscription {
    newAuthor {
      name
      born
      bookCount
      id
    }
  }
`