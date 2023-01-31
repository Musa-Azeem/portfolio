const express = require('express')

const app = express()

app.get('/', (req, res) => {    // root won't work (something to do with /{proxy})
    res.json({mssg: "You've reached root"})
})

app.get('/hello', (req, res) => {    // request, response
    res.json({mssg: 'Welcome to the app'})
})

module.exports = app