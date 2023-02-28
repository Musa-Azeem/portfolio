import React from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
// import cluster from '../assets/images/cluster.png'
import { TrashIcon } from "./Icons"

const ProjectCard = ({ project, admin, SRV_URL }) => {

  const { projects, dispatch } = useProjectsContext()

  const handleDelete = async () => {
    console.log("delete")
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
  const cluster = "https://drive.google.com/uc?export=view&id=142UDLhTMqBkqIbAko2UsowqyvEyf6qJl"
  // https://drive.google.com/uc?export=view&id=[image id]
  return (
    <section className="projectCard">
      <img src={ cluster } alt={ "Image for " + project.title }></img>
      <h1>{ project.title }</h1>
      <p>{ project.description }</p>
      <div onClick={ handleDelete }>
        <TrashIcon />
      </div>
    </section>
  )
}

export default ProjectCard