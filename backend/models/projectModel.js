const { urlencoded } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define schema for a project
const workoutSchema = new Schema({
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
    requred: false
  }
})