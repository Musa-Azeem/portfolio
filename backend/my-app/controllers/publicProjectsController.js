const mongoose = require('mongoose')
const Project = require('../models/projectModel')


// get all projects for all users
const getAllProjects = async (req, res) => {

  // Find all projects
  const projects = await Project.find({})
      .sort({createdAt: -1})                  // Sort by date created in descending order

  res.status(200).json(projects)              // Send back json object with all projects
}

module.exports = getAllProjects