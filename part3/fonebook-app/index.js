const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")
const app = express()

// custom morgan token for response body
morgan.token("resbody", (req, res) => JSON.stringify(res.req.body))

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    req.method === "POST"
      ? tokens.resbody(req, res)
      : ""
  ].join(" ")}))

//#region ROUTES

// display info
app.get("/info", (req, res, next) => {
  Person.find({})
    .then(result => {
      // console.log(result.length)
      res.send(`<p>Fonebook has info for ${result.length} people</p>${Date()}`)
    })
    .catch(err => {
      next(err)
    })
})

// get fonebook db
app.get("/api/fonebook", (req, res, next) => {
  Person.find({})
    .then(result => {
      // console.log(result)
      res.json(result)
    })
    .catch(err => {
      next(err)
    })
})

// get a single resource
app.get("/api/fonebook/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).send({ error: "id not found" })
      }})
    .catch(err => {
      next(err)
    })
})

// delete resource
app.delete("/api/fonebook/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log("Deleted resource:", result)
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

// post new person to fonebook
app.post("/api/fonebook", (req, res, next) => {
  const person = new Person({ name: req.body.name, number: req.body.number })
  person.save()
    .then(newPerson => {
      // console.log(newPerson)
      res.json(newPerson.toJSON())
    })
    .catch(err => {
      next(err)
    })
})

// update person
app.put("/api/fonebook/:id", (req, res, next) => {
  const update = { number: req.body.number }
  const filter = { _id: req.params.id }

  Person.findOneAndUpdate(filter, update, { new: true, runValidators: true })
    .then(updatedPerson => {
      if(updatedPerson === null) {
        res.status(400).send({ type:"DATABASE_ERROR", error: `No ${req.body.name} found on database` })
      } else {
        res.json(updatedPerson)
      }
    })
    .catch(err => {
      next(err)
    })

})

//#endregion

// handle unknown endpoint
app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
})

// handle errors
app.use((err, req, res, next) => {
  console.log(err.name)
  console.error(err.message)

  if(err.name === "CastError") {
    return res.status(400).send({ error: "invalid id" })
  } else if(err.name === "ValidationError") {
    return res.status(400).json({ type: "VALIDATION_ERROR", error: err.message })
  }

  next(err)
})

// start server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
