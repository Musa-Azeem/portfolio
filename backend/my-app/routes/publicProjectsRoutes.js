const express = require('express')
const getAllProjects = require('../controllers/publicProjectsController')

const router = express.Router()

// GET /api/projects/ - return all projects
router.get('/', getAllProjects)

module.exports = router     // Export the router for the app