const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    require: true
  },
  favouriteGenre: {
    type: String,
    require: true
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("User", schema)