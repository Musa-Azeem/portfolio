const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Function to create tokens
const createToken = (_id) => {
  // _id: document id

  return jwt.sign(
    {_id},                  // document id
    process.env.SECRET,     // secret
    { expiresIn: '3d' })    // token expires in 3 days 
}

// Login a user
const loginUser = async (req, res) => {
  // req contains user email and password

  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a json web token
    const token = createToken(user._id)

    // return logged in email and jwt in response
    res.status(200).json({email, token})
  } 
  
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

// sign a user up
const signupUser = async (req, res) => {
  // req should include new user's email and password

  // If signing up users is disabled, return error
  if (process.env.SIGNUP_DISABLED == 'true') {
    res.status(400).json({error: "New Users are currently disabled"})
    return
  }

  const {email, password} = req.body

  try {
    // hash password and create document
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)
    
    // return new logged in email and jwt in response
    res.status(200).json({email, token})
  } 
  
  catch (error) {
    // could be email taken error or some other error
    res.status(400).json({error: error.message})
  }
}

module.exports = { loginUser, signupUser }