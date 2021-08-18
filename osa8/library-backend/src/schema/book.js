const {
  gql,
  UserInputError,
  AuthenticationError 
} = require("apollo-server-express")
const { PubSub } = require("graphql-subscriptions")

const Book = require("../models/book")
const Author = require("../models/author")

const pubsub = new PubSub()

const bookTypeDefs = gql`
  type Query {
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ) : Book
  }
  type Subscription {
    bookAdded: Book!
  }
`

const bookResolvers = {
  Query: {
    booksCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      
      if(args.author && args.genre) {
        return Book
          .find({ author: { $in: [author._id] }})
          .find({ genres: { $in: [args.genre] }})
        // return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      } else if(args.author) {
        return Book.find({ author: { $in: [author._id] }})
        // return books.filter(book => book.author === args.author)
      } else if(args.genre) {
        return Book.find({ genres: { $in: [args.genre] }})
        // return books.filter(book => book.genres.includes(args.genre))
      } else {
        return Book.find({})
      }
    },
  },
  Book: {
    title: (root) => root.title,
    author: (root) => Author.findById(root.author),
    published: (root) => root.published,
    genres: (root) => root.genres
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser  
      if(!currentUser) {
        throw new AuthenticationError("Unauthorized request")
      }
      
      const year = new Date().getFullYear()
      if(args.published > year) {
        throw new UserInputError("Year published can not be in the future", {
          invalidArgs: args.published
        })
      }

      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = new Author({ name: args.author })
      }
    
      const book = new Book({ 
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      try {
        await book.save()
        author.authoredBooks = author.authoredBooks.concat(book._id)
        await author.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      // console.log(author)
      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
}

module.exports = {
  bookTypeDefs,
  bookResolvers
}