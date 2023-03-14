import { React, useState, useEffect, useRef } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { Link } from 'react-router-dom'
import { GithubIcon, TrashIcon, EditIcon } from "./Icons"
import { useAuthContext } from '../hooks/useAuthContext'


const ProjectCard = ({ project, SRV_URL, setProjectToEdit }) => {

  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()
  const [isHover, setIsHover] = useState(false);
  const [backHeight, setBackHeight] = useState(0)
  const backRef = useRef(null)
  
  useEffect(() => {
    setBackHeight(backRef.current.clientHeight)
  }, [])

  const handleDelete = async () => {
    // Use Delete API to delete project from DB
    // Use fetch API to send post request to add new workout to DB
    const response = await fetch(`${SRV_URL}/${project._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({type: "DELETE_PROJECT", payload: project})
  }

  const getHeight = () => {
    if (isHover) {
      return `${20+backHeight}px`
    }
    else {
      // if (25vh less than 160px) -> 25vh, else -> 160px
      const maxHeight = 160;
      return 25*(0.01*window.innerHeight) <= maxHeight ? '25vh' : `${maxHeight}px`
    }
  }

  return (
    <div className="projectCard" 
      onMouseEnter={() => { setIsHover(true)} }
      onMouseLeave={() => { setIsHover(false)} } 
      style = { {height: getHeight()} }
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
                <div onClick={ () => {setProjectToEdit(project)} }>
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