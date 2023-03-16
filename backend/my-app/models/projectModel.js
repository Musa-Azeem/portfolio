const { urlencoded } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define schema for a project
const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projectUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    requred: true
  },
  user_id: {  // every workout doc must be associated with a user
    type: String,
    required: true
  }
})

// Make and export model based on this schema
module.exports = mongoose.model('Project', projectSchema)   // collection name, schema