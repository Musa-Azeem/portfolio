import React, { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext"

const AddNewProjectCard = ({ SRV_URL, projectToEdit, setProjectToEdit }) => {

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

    // Use fetch API to send post request to add new project to DB
    // const response = await fetch(SRV_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(project),   // send project object as json string as expected
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    // // Check response 
    // // response object is new project or error
    // const json = await response.json() 
    // if (!response.ok) {
    //   setError(json.error)
    //   setEmptyFields(json.emptyFields)
    // }

    // if (response.ok) {
    //   setError(null)
    //   setEmptyFields([])
    //   console.log('new project added', json)

    //   // Reset all form states
    //   setTitle('')
    //   setDescription('')
    //   setProjectUrl('')
    //   setImageUrl('')

      // Now that new project is added to DB, update local projects in context
      dispatch({type: 'UPDATE_PROJECT', payload: project})
    // }

    // Remove edit card
    setProjectToEdit(null)
  }

  
  return (
    <> 
      {projectToEdit &&
        <section className="editProjectCard">
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
              className={ emptyFields.includes('description') ? 'error full' : 'full' }
              placeholder="Edit Description"
            />

          <button>Save Change</button>

          {/* Output error if there is one */}
          {error && <div className="error">{ error }</div>}
          </form>
        </section>
      }
    </>
  )
}

export default AddNewProjectCard