import { React, useState, useEffect, useRef } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { Link } from 'react-router-dom'
import { GithubIcon, TrashIcon, EditIcon } from "./Icons"
import { useAuthContext } from '../hooks/useAuthContext'
import { SRV_URL } from '../config'
import path from 'path-browserify'

const ProjectCard = ({ project, handleEditClick }) => {

  const { dispatch } = useProjectsContext()
  const { user } = useAuthContext()
  const [isHover, setIsHover] = useState(false);
  const [height, setHeight] = useState('')
  const backRef = useRef(null)
  
  useEffect(() => {
    if (isHover) {
      setHeight(`${20+backRef.current.clientHeight}px`)
    }
    else {
      // if (25vh less than 160px) -> 25vh, else -> 160px
      const maxHeight = 160;
      setHeight(25*(0.01*window.innerHeight) <= maxHeight ? '25vh' : `${maxHeight}px`)
    }
  }, [])

  const handleDelete = async () => {
    // Use Delete API to delete project from DB
    // Use fetch API to send post request to add new workout to DB
    const response = await fetch(path.join(SRV_URL, "projects", project._id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    dispatch({type: "DELETE_PROJECT", payload: project})
  }

  // const getHeight = () => {
  //   if (isHover) {
  //     return `${20+backHeight}px`
  //   }
  //   else {
  //     // if (25vh less than 160px) -> 25vh, else -> 160px
  //     const maxHeight = 160;
  //     return 25*(0.01*window.innerHeight) <= maxHeight ? '25vh' : `${maxHeight}px`
  //   }
  // }

  return (
    <div className="projectCard" 
      onMouseEnter={() => { setIsHover(true)} }
      onMouseLeave={() => { setIsHover(false)} } 
      style = { {height: height} }
    >
      <div className="innerProjectCard">
        <div className="projectCardFront">
          <img src={ project.imageUrl } alt={ "Image for " + project.title }></img>
          <h1>{ project.title }</h1>
        </div>
        <div className="projectCardBack">
          <div ref={ backRef }>
            <p>{ project.description }</p>
            <div className="iconsList">
              {user && 
                <div onClick={ handleDelete }>
                  <TrashIcon />
                </div>
              }
              <Link to={ project.projectUrl } target="_blank">
                <GithubIcon />
              </Link>
              { user &&
                <div onClick={ () => { handleEditClick(project) } }>
                  <EditIcon />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard