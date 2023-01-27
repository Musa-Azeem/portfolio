const mongoose = require('mongoose')
const Project = require('../models/projectModel')


// get all projects
const getProjects = async (req, res) => {     // asynchronous - wait for response from DB
  const projects = await Project.find({})     // empty object to search for to get all workouts (put something like {reps: 20} for object if searching)
      .sort({createdAt: -1})                  // Sort by date create in descending order

  res.status(200).json(workouts)              // Send back json object with all workout
}

// get one project
const getProject = async (req, res) => {
}

// Create new project
const createProject = async (req, res) => {
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



