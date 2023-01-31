require('dotenv').config()  // .env should have PORT and MONGOURI
const express = require('express')
const mongoose = require('mongoose')
const projectsRoutes = require('./routes/projectRoutes')

const app = express()

// Middleware
app.use(express.json())     // attach json objects sent with request
app.use((req, res, next) => {   // request, response, next middleware function
  // Log Request
  console.log(req.path, req.method)
  next()
})

// use routes relative to /api/projects/
app.use('/api/projects/', projectsRoutes)

app.get('/api', (req, res) => {    // request, response
    res.json({mssg: 'Welcome to the Api'})
})

// Connect to MongoDB on Atlas
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  // call when connection is complete - only listen for request once connection to DB is established
  .then(() => {
    // If not on aws:   Listen for Requests in port defines in .env
    // app.listen(process.env.PORT), () => {
    //   console.log('Connected to DB and listening on port', process.send.MONGO_URI)
    // }
    console.log('Connected to DB')
  })
  .catch((error) => {     // Catch error
    console.log(error)
  })

module.exports = app