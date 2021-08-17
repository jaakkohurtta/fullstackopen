import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }   
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
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