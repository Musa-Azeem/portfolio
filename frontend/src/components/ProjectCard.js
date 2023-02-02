import React from "react"
// import cluster from '../assets/images/cluster.png'

const ProjectCard = ({ project }) => {
  const cluster = "https://drive.google.com/uc?export=view&id=142UDLhTMqBkqIbAko2UsowqyvEyf6qJl"
  // https://drive.google.com/uc?export=view&id=[image id]
  return (
    <section className="projectCard">
      <img src={ cluster } alt={ "Image for " + project.title }></img>
      <h1>{ project.title }</h1>
      <p>{ project.description }</p>
    </section>
  )
}

export default ProjectCard