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
  const { id } = req.params

  // Verify ID format (mongoose special format)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }
  
  // Search for project with requested id
  const project = await Project.findById(id)

  // Return 404 if doc doesn't exist
  if (!project) {
    return res.status(404).json({error: 'No such project'})
  }
  res.status(200).json(project)
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
  // Get Id of doc to delete from DELETE request url
  const { id } = req.params

  // Verify ID format (mongoose requires a special format)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such project'})
  }

  // Delete project
  const project = await Project.findOneAndDelete({_id: id})     // Property name in doc is '_id'

  if (!project) {
    return res.status(400).json({error: 'No such project'})
  }
  res.status(200).json(project)
}

// Update a project (PATCH)
const updateProject = async (req, res) => {
  // Get Id of doc to delete from PATCH request url
  const { id } = req.params

  // Verify ID format (mongoose requires a special format)
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such project'})
  }

  // find workout to update
  const project = await Project.findOneAndUpdate({_id: id}, { // returns original
      // Object to define update (can update individual fields)
      ...req.body     // Spread whichever properties were sent into this object
  })

  if (!project) {
      return res.status(400).json({error: 'No such project'})
  }
  res.status(200).json(project)
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
}



