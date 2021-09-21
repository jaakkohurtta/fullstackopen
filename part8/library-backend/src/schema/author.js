const {
  gql,
  UserInputError,
  AuthenticationError 
} = require("apollo-server-express")

const Author = require("../models/author")

const authorTypeDefs = gql`
  type Query {
    authorsCount: Int!
    allAuthors: [Author!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    authoredBooks: [Book!]!
    bookCount: Int
  }
  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
` 

const authorResolvers = {
  Query: {
    authorsCount: () => Author.collection.countDocuments(),
    allAuthors: () => { 
      return Author.find({}).populate("authoredBooks")
    }
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    authoredBooks: (root) => root.authoredBooks,
    id: (root) => root.id,
    bookCount: (root) => root.authoredBooks.length   
  },
  Mutation: {
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

      // console.log(author)

      author.born = args.setBornTo

      try {
        await author.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      
      }
      return author
    }
  }
}

module.exports = {
  authorTypeDefs,
  authorResolvers
}