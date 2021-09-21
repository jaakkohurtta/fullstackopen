const {
  gql
} = require("apollo-server-express")

const { makeExecutableSchema } = require("@graphql-tools/schema")
const { merge } = require("lodash")

const { bookTypeDefs, bookResolvers } = require("./book")
const { authorTypeDefs, authorResolvers } = require("./author")
const { userTypeDefs, userResolvers } = require("./user")

const miscTypeDefs = gql`
  type Token {
    value: String!
  }
`
const resolvers = {}

const schema = makeExecutableSchema({
  typeDefs: [ miscTypeDefs, bookTypeDefs, authorTypeDefs, userTypeDefs ],
  resolvers: merge(resolvers, bookResolvers, authorResolvers, userResolvers)
})

module.exports = schema