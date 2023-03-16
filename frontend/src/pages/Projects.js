import React, { useState, useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddNewProjectCard from '../components/AddNewProjectCard'
import EditProject from '../components/EditProject'
import { useProjectsContext } from '../hooks/useProjectsContext'
import { SRV_URL } from '../config'
import path from 'path-browserify'
import { useAuthContext } from '../hooks/useAuthContext'

const Projects = () => {
  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()
  const [projectToEdit, setProjectToEdit] = useState(null)

  const editProjectRef = useRef(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(path.join(SRV_URL, 'public-projects'))
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_PROJECTS', payload: json})
      }
    }
    fetchProjects()
  }, [dispatch])

  return (
    <div className="projectsPage">
      <div className="header">
        <h1>Projects</h1>
      </div>
      {user &&
        <AddNewProjectCard />
      }
      { user && projectToEdit &&
        <EditProject 
          projectToEdit={ projectToEdit }
          setProjectToEdit={ setProjectToEdit }
          ref={ editProjectRef }
        />
      }
      <div className="projectsBody">   
        {/* Create a Project Card for each project fetched from DB */}
        { 
          (() => {
            if (projects) { 
              return (
                projects.map((p) => (
                  <ProjectCard 
                    key={ p._id } 
                    project={ p } 
                    setProjectToEdit={ setProjectToEdit }
                    editProjectRef={ editProjectRef }
                  />
                ))
              )
            }
            else {
              return (<>
                <p></p>
                <p className="loading">Loading Projects...</p>
              </>)
            }
          })()
        }
      </div>
    </div>
  )
}

export default Projects