const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Static signup method
userSchema.statics.signup = async function(email, password) {

  // Check for empty fields
  if (!email || !password) { // check if null
    throw Error('All fields must be filled')
  }

  // Check if email is valid (*@*.*)
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }

  // Check if email exists (double check unique)
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  // Hash password
  // salt is random string of characters added to password before hashing
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // Create document with new user/password
  const user = await this.create({ email, password: hash }) 

  return user
}

// Static login method
userSchema.statics.login = async function(email, password) {
  // Checks if user exists and password is correct
  // Returns the document of the requested user

  // Check for empty fields
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  // Check if email exists in DB
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  // Check if given password matches password in DB
  // bcrypt.compare will unhash password in DB and compare to user's password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)