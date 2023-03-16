import React, { useState, useEffect } from "react";
import path from 'path-browserify'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { SRV_URL } from '../config'
import { useAuthContext } from "../hooks/useAuthContext";

const EditProjectCard = ({ projectToEdit, setProjectToEdit, ref }) => {
  const { user } = useAuthContext()

  const [title, setTitle] = useState(projectToEdit.title)
  const [description, setDescription] = useState(projectToEdit.description)
  const [projectUrl, setProjectUrl] = useState(projectToEdit.projectUrl)
  const [imageUrl, setImageUrl] = useState(projectToEdit.imageUrl)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])  // Which fields were empty after form submission

  const {projects, dispatch} = useProjectsContext()
  function formatUrl() {
    // Format google drive image URL to enable embedding
    if (imageUrl.endsWith("view?usp=sharing")) {
      // If URL ends this way, it is not formatted
      const imageUrlId = imageUrl.split('/')[5]
      return "https://drive.google.com/uc?export=view&id=" + imageUrlId
    }
    return imageUrl
  }

  useEffect(() => {
    // Update form fields when project to edit changes
    setTitle(projectToEdit.title)
    setDescription(projectToEdit.description)
    setProjectUrl(projectToEdit.projectUrl)
    setImageUrl(projectToEdit.imageUrl)
    setError(null)
    setEmptyFields([])
  }, [projectToEdit])

  const handleSubmit = async (e) => {
    // e is form submission event
    e.preventDefault()  // prevent page from refreshing on form submit

    const newImageUrl = formatUrl()

    // Copy meta contents of projectToEdit but update input fields
    const project = {
      ...projectToEdit,
      title: title, 
      description: description, 
      projectUrl: projectUrl, 
      imageUrl: newImageUrl
    }

    // Send modified project to server
    const response = await fetch(path.join(SRV_URL, 'projects', projectToEdit._id), {
      method: 'PATCH',
      body: JSON.stringify(project),   // send project object as json string as expected
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
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
      setEmptyFields([])

      // Now that new project is added to DB, update local projects in context
      dispatch({type: 'UPDATE_PROJECT', payload: project})
    // }

    // Remove edit card
    setProjectToEdit(null)
    }
  }
  
  return (
    <> 
      {projectToEdit &&
        <section className="editProjectCard" ref={ ref }>
          <h1>{ `Edit Project -- ${projectToEdit.title}` }</h1>
          <form onSubmit={handleSubmit}>
            <div className="topRow">
              <input
                type="text"
                onChange={ (e) => setTitle(e.target.value)}
                value = { title }
                placeholder="Edit Title"
              />
              <input
                  type="text"
                  onChange={ (e) => setProjectUrl(e.target.value)}
                  value = { projectUrl }
                  placeholder="Edit Project URL"
              />
              <input
                  type="text"
                  onChange={ (e) => setImageUrl(e.target.value)}
                  value = { imageUrl }
                  className={ emptyFields.includes('imageUrl') ? 'error' : '' } // Can have an invalid imageURL
                  placeholder="Edit Image URL"
              />
            </div>
            <input
              type="text"
              onChange={ (e) => setDescription(e.target.value)}
              value = { description }
              placeholder="Edit Description"
            />

            <button>Save Change</button>

            {/* Output error if there is one */}
            {error && <div className="error">{ error }</div>}
          </form>

          <button onClick={ () => {setProjectToEdit(null)} }>
            Cancel
          </button>
        </section>
      }
    </>
  )
}

export default EditProjectCard