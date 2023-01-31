import { useEffect } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ContextTester = () => {
  const { projects, dispatch } = useProjectsContext()  // Get context dispatch function to update local project

  useEffect(() => {
    dispatch({type: 'SET_PROJECTS', payload: [
      // Random workouts to test
    {
      "_id": "1",
      "title": "title1",
      "description": "des1",
      "projectUrl": "url1"
    },
    {
      "_id": "2",
      "title": "title2",
      "description": "des2",
      "projectUrl": "url2"
    },
    {
      "_id": "3",
      "title": "title3",
      "description": "des3",
      "projectUrl": "url3"
    } 
    ]})
  }, [dispatch]) 
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
  handleSetClick = () => {

  }
  return (
    <div>
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleUpdateClick}>Update</button>      
    </div>
  )
}

export default ContextTester