import React, { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext"

const AddNewProjectCard = ({ SRV_URL }) => {
  const { projects, dispatch } = useProjectsContext()

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
      const json = project
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
        <h1>Add new Project</h1>
        <label>Title</label>
        <input
          type="text"
          onChange={ (e) => setTitle(e.target.value)}
          value = { title }
          className={ emptyFields.includes('title') ? 'error' : '' }
        />

      <label>Description</label>
      <input
          type="text"
          onChange={ (e) => setDescription(e.target.value)}
          value = { description }
          className={ emptyFields.includes('description') ? 'error' : '' }
      />

      <label>Project URL</label>
      <input
          type="text"
          onChange={ (e) => setProjectUrl(e.target.value)}
          value = { projectUrl }
          className={ emptyFields.includes('projectUrl') ? 'error' : '' }
      />

      <button>Add Project</button>

      {/* Output error if there is one */}
      {error && <div className="error">{ error }</div>}
      </form>
    </section>
  )
}

export default AddNewProjectCard