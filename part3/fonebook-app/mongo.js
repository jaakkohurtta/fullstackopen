/* eslint-disable no-undef */
const mongoose = require("mongoose")

if(process.argv.length < 3) {
  console.log("Give password to access to database.")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fonebook-app:${password}@fonebook.n1fr1.mongodb.net/fonebook-db?retryWrites=true&w=majority`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model("Person", personSchema)


if(process.argv.length === 3) {
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if(process.argv.length === 5) {
  let name = process.argv[3]
  let number = process.argv[4]

  const person = new Person({ name, number })
  person.save()
    .then(res => {
      // console.log(res)
      console.log(`added ${res.name} number ${res.number} to database`)
      mongoose.connection.close()
    })
} else {
  console.log("Invalid amount of parameters")
  mongoose.connection.close()
}