const { ApolloServer, gql, UserInputError } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const mongoose = require("mongoose")
const { v1: uuid } = require("uuid")
const config = require("./config")

const Book = require("./models/book")
const Author = require("./models/author")

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log("connected to MongoDB")
})
.catch((error) => {
  console.error("error connection to MongoDB:", error.message)
})

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
    authorsCount: () => Author.collection.countDocuments(),
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
      }else if(args.genre) {
        return Book.find({ genres: { $in: [args.genre] }})
        // return books.filter(book => book.genres.includes(args.genre))
      } else {
        return Book.find({})
      }
      
    },
    allAuthors: () => Author.find({})
  },
  Book: {
    title: (root) => root.title,
    author: (root) => Author.findById(root.author),
    published: (root) => root.published,
    genres: (root) => root.genres
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: { $in: [author._id] }})
      return books.length
      // books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const year = new Date().getFullYear()
      if(args.published > year) {
        throw new UserInputError("Year published can not be in the future", {
          invalidArgs: args.published
        })
      }
      let author = await Author.findOne({ name: args.author })

      // console.log(author)

      if(!author) {
        author = new Author({ name: args.author })
        await author.save()
      } 

      // console.log(author._id.toString())

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      return book.save()
    },
    editAuthor: async (root, args) => {
      const year = new Date().getFullYear()
      if(args.setBornTo > year) {
        throw new UserInputError("Author birth year can not be in the future", {
          invalidArgs: args.setBornTo
        })
      }

      const author = await Author.findOne({ name: args.name })
      if(!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginLandingPageGraphQLPlayground() ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})