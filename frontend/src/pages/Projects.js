import React from 'react'
import ProjectCard from '../components/ProjectCard'
import cluster from '../assets/images/cluster.png'

const Projects = () => {
  return (
    <div class="projectsPage">
      <div className="header">
        <h1>Projects</h1>
      </div>
      <div className="projectsBody">
        <ProjectCard 
          projectTitle={ "K-Means Cluster Analysis" } 
          image={ cluster }
          projectDescription={ "Cluster Analysis Built from scratch in C++ with no libraries" }
        />
        <ProjectCard 
          projectTitle={ "K-Means Cluster Analysis" } 
          image={ cluster }
          projectDescription={ "Cluster Analysis Built from scratch in C++ with no libraries" }
        />
        <ProjectCard 
          projectTitle={ "K-Means Cluster Analysis" } 
          image={ cluster }
          projectDescription={ "Cluster Analysis Built from scratch in C++ with no libraries" }
        />
        <ProjectCard 
          projectTitle={ "K-Means Cluster Analysis" } 
          image={ cluster }
          projectDescription={ "Cluster Analysis Built from scratch in C++ with no libraries" }
        />
      </div>
    </div>
  )
}

export default Projects