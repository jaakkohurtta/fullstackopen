const {
  gql,
  UserInputError
} = require("apollo-server-express")
const jwt = require("jsonwebtoken")
const config = require("../config")

const User = require("../models/user")

const userTypeDefs = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
    password: String!
    favouriteGenre: String!
    id: ID!
  }
  type Mutation {
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

const userResolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
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

module.exports = {
  userTypeDefs,
  userResolvers
}