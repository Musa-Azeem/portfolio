import { React, useState } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
// import cluster from '../assets/images/cluster.png'
import { TrashIcon } from "./Icons"

const ProjectCard = ({ project, admin, SRV_URL }) => {

  const { projects, dispatch } = useProjectsContext()
  const [isHover, setIsHover] = useState(false);

  const handleDelete = async () => {
    // Use Delete API to delete project from DB
    // Use fetch API to send post request to add new workout to DB
    const response = await fetch(`${SRV_URL}/${project._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({type: "DELETE_PROJECT", payload: project._id})
  }
  
  const getOnHoverHeight = () => {
    // Get height of card to fit description on hover
    console.log(project.description.length)
    return `${.2*project.description.length}vh`
  }
  // const cluster = "https://drive.google.com/uc?export=view&id=142UDLhTMqBkqIbAko2UsowqyvEyf6qJl"
  // https://drive.google.com/uc?export=view&id=[image id]
  return (
    <div className="projectCard" 
      onMouseEnter={() => { setIsHover(true)} }
      onMouseLeave={() => { setIsHover(false)} } 
      style = { {height: isHover ? getOnHoverHeight() : ""} }
    >
      <div className="innerProjectCard">
        <div className="projectCardFront">
          <img src={ project.imageUrl } alt={ "Image for " + project.title }></img>
          <h1>{ project.title }</h1>
        </div>
        <div className="projectCardBack">
          <p>{ project.description }</p>
          {admin && <div onClick={ handleDelete }>
            <TrashIcon />
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard