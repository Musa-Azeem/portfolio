const mongoose = require('mongoose')
const Project = require('../models/projectModel')
const checkImageUrl = require('../utils/checkImageUrl')


// get all projects for logged in user
const getProjects = async (req, res) => {
  user_id = req.user._id

  // Find all projects created by this user
  const projects = await Project.find({user_id})
      .sort({createdAt: -1})                  // Sort by date created in descending order

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

  const newImageUrl = checkImageUrl(imageUrl)
  if (!newImageUrl) {
    // If image URL was not formatted correctly, make it an error field
    emptyFields.push('imageUrl')
  }

  if (emptyFields.length > 0) {
    if (emptyFields.includes('imageUrl')){
      return res.status(400)
        .json({
          error: 'Please fill in all the fields and provide a valid image URL', 
          emptyFields: emptyFields
        })
    }
    return res.status(400)
      .json({error: 'Please fill in all the fields', emptyFields: emptyFields})
  }

  // Create new project document in DB
  try {
    const user_id = req.user._id

    const project = await Project.create({
      "title": title, 
      "description": description, 
      "projectUrl": projectUrl,
      "imageUrl": newImageUrl,
      "user_id": user_id
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



