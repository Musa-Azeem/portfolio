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
    const response = await fetch(SRV_URL, {
      method: 'POST',
      body: JSON.stringify(project),   // send project object as json string as expected
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Check response 
    // response object is new project or error
    const json = await response.json() 
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setError(null)
      setEmptyFields([])
      console.log('new project added', json)

      // Reset all form states
      setTitle('')
      setDescription('')
      setProjectUrl('')

      // Now that new project is added to DB, update local projects in context
      dispatch({type: 'CREATE_PROJECT', payload: json})
    }
  }

  
  return (
    <section className="addNewProjectCard">
      <h1>Add new Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={ (e) => setTitle(e.target.value)}
          value = { title }
          className={ emptyFields.includes('title') ? 'error halfLeft' : 'halfLeft' }
          placeholder="Title"
        />

        <input
            type="text"
            onChange={ (e) => setProjectUrl(e.target.value)}
            value = { projectUrl }
            className={ emptyFields.includes('projectUrl') ? 'error halfRight' : 'halfRight' }
            placeholder="Project Url"
            />
        <input
            type="text"
            onChange={ (e) => setDescription(e.target.value)}
            value = { description }
            className={ emptyFields.includes('description') ? 'error full' : 'full' }
            placeholder="Description"
            />

      <button>Add Project</button>

      {/* Output error if there is one */}
      {error && <div className="error">{ error }</div>}
      </form>
    </section>
  )
}

export default AddNewProjectCard