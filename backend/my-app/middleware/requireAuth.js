const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => { 
  // Middleware to check that a user a is logged in
  //    Attaches user's id to request

  // verify user is authenticated (frontend will send token as part of header)
  const { authorization } = req.headers   

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  // auth string looks like 'Bearer xxx.xxx.xxx' - want to get token (second item after space)
  const token = authorization.split(' ')[1]

  try {
    // verify token with secret key - returns id of user
    const { _id } = jwt.verify(token, process.env.SECRET)

    // find user in database - attach id to request that will be passed to routes
    req.user = await User.findOne({ _id }).select('_id')
    next()  // call next middleware

  } 
  
  catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth