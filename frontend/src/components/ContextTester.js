import { useEffect } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ContextTester = ({ SRV_URL }) => {
  const { projects, dispatch } = useProjectsContext()  // Get context dispatch function to update local project

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

  useEffect(() => {
    console.log(projects)
  }, [projects])

  const handleDeleteClick = () => {
    // delete project 1
    const json = {
      "_id": "1",
      "title": "title1",
      "description": "des1",
      "projectUrl": "url1"
    }
    dispatch({type: 'DELETE_PROJECT', payload: json})
  }
  const handleCreateClick = () => {
    const json = {
      "_id": "4",
      "title": "title4",
      "description": "des4",
      "projectUrl": "url4"
    }
    dispatch({type: 'CREATE_PROJECT', payload: json})
  }
  return (
    <div>
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  )
}

export default ContextTester