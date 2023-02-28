import React, { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext"

const AddNewProjectCard = ({ SRV_URL }) => {
  const { projects, dispatch } = useProjectsContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])  // Which fields were empty after form submission

  function formatUrl() {
    // Format google drive image URL to enable embedding
    if (imageUrl.endsWith("view?usp=sharing")) {
      // If URL ends this way, it is not formatted
      const imageUrlId = imageUrl.split('/')[5]
      return "https://drive.google.com/uc?export=view&id=" + imageUrlId
    }
    return imageUrl
  }

  const handleSubmit = async (e) => {
    // e is form submission event
    e.preventDefault()  // prevent page from refreshing on form submit

    const newImageUrl = formatUrl()
    console.log(newImageUrl)

    const project = {title, description, projectUrl, imageUrl}

    // Use fetch API to send post request to add new project to DB
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
      setImageUrl('')

      // Now that new project is added to DB, update local projects in context
      dispatch({type: 'CREATE_PROJECT', payload: json})
    }
  }

  
  return (
    <section className="addNewProjectCard">
      <h1>Add new Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="topRow">
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
              placeholder="Project URL"
          />
          <input
              type="text"
              onChange={ (e) => setImageUrl(e.target.value)}
              value = { imageUrl }
              className={ emptyFields.includes('imageUrl') ? 'error' : '' }
              placeholder="Image URL"
          />
        </div>
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