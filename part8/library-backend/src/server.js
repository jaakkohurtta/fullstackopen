const {
  ApolloServer
} = require("apollo-server-express")
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core")

const express = require("express")
const { createServer } = require("http")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("./config")

const schema = require("./schema/schema")
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

const startApolloServer = async () => {
  const app = express()
  const server = new ApolloServer({
    schema,
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

  await server.start()

  server.applyMiddleware({
    app,
    path: "/"
  })
 
  const httpServer = createServer(app)

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe
  }, {
    server: httpServer,
    path: server.graphqlPath
  })
 
  httpServer.listen(4000, () => console.log(`Server ready at http://localhost:4000${server.graphqlPath}`))
}

startApolloServer()