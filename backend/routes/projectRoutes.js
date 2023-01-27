const express = require('express')
const projcetModel = require('../models/projectModel')
const {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject
} = require('../controllers/projectsControllerprojects')

const router = express.Router()

// GET /api/projects/ - return all projects
router.get('/', getProjects)

// GET a single project
router.get('/:id', getProject)        // :id means id can change      

// POST a new project
router.post('/', createProject)

// DELETE a project
router.delete('/:id',deleteProject)

// UPDATE a project
router.patch('/:id', updateProject)

module.exports = router     // Export the router for the app