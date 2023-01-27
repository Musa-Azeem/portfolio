require('dotenv').config()  // .env should have PORT and MONGOURI
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.json())     // attach json objects sent with request
app.use((req, res, next) => {   // request, response, next middleware function
  // Log Request
  console.log(req.path, req.method)
  next()
})

// Connect to MongoDB on Atlas
mongoose.connect(process.env.MONGO_URI)
  // call when connection is complete - only listen for request once connection to DB is established
  .then(() => {
    // Listen for Requests in port defines in .env
    app.listen(process.env.PORT), () => {
      console.log('Connected to DB and listening on port', process.send.MONGO_URI)
    }
  })
  .catch((error) => {     // Catch error
    console.log(error)
  })