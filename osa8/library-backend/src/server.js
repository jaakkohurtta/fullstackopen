const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("./config")

const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")

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
  type User {
    username: String!
    password: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favouriteGenre: String!
    ) : User
    loginUser(
      username: String!
      password: String!
    ) : Token
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
    allAuthors: () => Author.find({}),
    me: (root, args, contenxt) => {
      return context.currentUser
    }
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

      // console.log(author)

      if(!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        }
        catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      } 

      // console.log(author._id.toString())

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author
      })

      try {
        await book.save()
      } 
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError("Unauthorized request")
      }

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

      try {
        author.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        password: "p4ssw0rd",
        favouriteGenre: args.favouriteGenre
      })

      try {
        user.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return user
    },
    loginUser: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || user.password !== args.password) {
        throw new UserInputError("Wrong username of password")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [ ApolloServerPluginLandingPageGraphQLPlayground() ]
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})