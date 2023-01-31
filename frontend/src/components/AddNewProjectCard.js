import React, { useState } from "react";

const AddNewProjectCard = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])  // Which fields were empty after form submission

  const handleSubmit = async (e) => {
    // e is form submission event
    e.preventDefault()  // prevent page from refreshing on form submit

    const project = {title, description, projectUrl}

    // Use fetch API to send post request to add new workout to DB
    // const response = await fetch('/api/projects/', {
    //   method: 'POST',
    //   body: JSON.stringify(project),   // send project object as json string as expected
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    // Check response 
    // response object new project or error
    // const json = await response.json() 
    // if (!response.ok) {
    //   setError(json.error)
    //   setEmptyFields(json.emptyFields)
    // }
    // if (response.ok) {
      setError(null)
      setEmptyFields([])
      console.log('new project added', json)

      // Reset all form states
      setTitle('')
      setDescription('')
      setProjectUrl('')

      // Now that new project is added to DB, update local projects in context
      dispatch({type: 'CREATE_PROJECT', payload: json})
    // }
    }

  
  return (
    <section className="addNewProjectCard">
      <form onSubmit={handleSubmit}>
        
      </form>
    </section>
  )
}

export default ProjectCard