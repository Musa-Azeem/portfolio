import React from "react";

const ProjectCard = ({ projectTitle, projectDescription, image }) => {
  return (
    <section className="projectCard">
      <img src={ image } alt={ "Image for " + projectTitle }></img>
      <h1>{ projectTitle }</h1>
      <p>{ projectDescription }</p>
    </section>
  )
}

export default ProjectCard