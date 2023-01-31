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

  const handleDeleteClick = async () => {
    // delete project 1
    const json = {
      "_id": "1",
      "title": "title1",
      "description": "des1",
      "projectUrl": "url1"
    }
    dispatch({type: 'DELETE_PROJECT', payload: json})
    console.log(projects)
  }
  return (
    <div>
      {/* <h1 onClick={handleGetClick}>Get all</h1> */}
      {/* <h1 onClick={handleGetOneClick}>Get One</h1> */}
      {/* <h1 onClick={handleCreateClick}>Create</h1> */}
      <button onClick={handleDeleteClick}>Delete</button>
      {/* <h1 onClick={handleUpdateClick}>Update</h1>       */}
    </div>
  )
}

export default ContextTester