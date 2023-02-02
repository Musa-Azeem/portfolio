import React, { useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddNewProjectCard from '../components/AddNewProjectCard'
import { useProjectsContext } from '../hooks/useProjectsContext'

const Projects = () => {
  const SRV_URL = "https://m5tx556ood.execute-api.us-east-2.amazonaws.com/Prod/api/projects/"
  const { projects, dispatch } = useProjectsContext()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(SRV_URL)
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_PROJECTS', payload: json})
      }
    }
    fetchProjects()
  }, [dispatch, SRV_URL])

  return (
    <div className="projectsPage">
      <div className="header">
        <h1>Projects</h1>
      </div>
      <AddNewProjectCard SRV_URL={ SRV_URL }/>
      <div className="projectsBody">        
        {/* Create a Project Card for each project fetched from DB*/}
        {projects && projects.map((p) => (
          <ProjectCard key={ p._id } project={ p } />
        ))}
      </div>
    </div>
  )
}

export default Projects