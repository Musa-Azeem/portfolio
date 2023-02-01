import React from 'react'
import ProjectCard from '../components/ProjectCard'
import AddNewProjectCard from '../components/AddNewProjectCard'
import ContextTester from '../components/ContextTester'
import cluster from '../assets/images/cluster.png'

const Projects = () => {

  const SRV_URL = "https://m5tx556ood.execute-api.us-east-2.amazonaws.com/Prod/api/projects/"
  return (
    <div className="projectsPage">
      <div className="header">
        <h1>Projects</h1>
      </div>
      <ContextTester SRV_URL={ SRV_URL }/>
      <AddNewProjectCard />
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