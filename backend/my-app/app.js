require('dotenv').config()  // .env should have PORT and MONGOURI
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const projectsRoutes = require('./routes/projectRoutes')
const userRoutes = require('./routes/userRoutes')
const publicProjectsRoutes = require('./routes/publicProjectsRoutes')

// Set deployment mode to AWS ('true') or local ('false') - default AWS
var AWS = true
if (process.env.AWS) {
  AWS = !(process.env.AWS == 'false')
}

const app = express()

// Middleware
app.use(cors({
    origin: '*'   // public API for now
}));

app.use(express.json())     // attach json objects sent with request
app.use((req, res, next) => {   // request, response, next middleware function
  // Log Request
  console.log(req.path, req.method)
  next()
})

// use routes relative to /api/projects/
app.use('/api/projects/', projectsRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/public-projects/', publicProjectsRoutes)

app.get('/api', (req, res) => {    // request, response
    res.json({mssg: 'Welcome to the Api'})
})

// Connect to MongoDB on Atlas
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  // call when connection is complete - only listen for request once connection to DB is established
  .then(() => {
    // If not on AWS, listen for requests in port defined in .env
    if (!AWS) {
      app.listen(process.env.PORT), () => {
        console.log('Connected to DB and listening on port', process.send.MONGO_URI)
      }
    }
    else {
      console.log('Connected to DB')
    }
  })
  .catch((error) => {     // Catch error
    console.log(error)
  })

module.exports = app