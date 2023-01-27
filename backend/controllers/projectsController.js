const mongoose = require('mongoose')
const Project = require('../models/projectModel')


// get all projects
const getProjects = async (req, res) => {     // asynchronous - wait for response from DB
  const projects = await Project.find({})     // empty object to search for to get all projects (put something like {reps: 20} for object if searching)
      .sort({createdAt: -1})                  // Sort by date create in descending order

  res.status(200).json(projects)              // Send back json object with all projects
}

// get one project
const getProject = async (req, res) => {
}

// Create new project
const createProject = async (req, res) => {
  const { title, description, projectUrl, imageUrl } = req.body

  // Check if any fields are empty - error msg for frontend
  console.log(req.body)
  emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!projectUrl) {
    emptyFields.push('projectUrl')
  }
  // imageUrl is optional

  if (emptyFields.length > 0) {
    return res.status(400)
      .json({error: 'Please fill in all the fields', emptyFields: emptyFields})
  }

  // Create new project document in DB
  try {
    const project = await Project.create({
      "title": title, 
      "description": description, 
      "projectUrl": projectUrl
    })
    // TODO version with image url
    res.status(200).json(project) // send back created project and good status
  }
  catch (error) {
    // send error status and error message json
    res.status(400).json({error: error.message})
  }
}

// Delete a project
const deleteProject = async(req, res) => {
}

// Update a project
const updateProject = async (req, res) => {
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
}



