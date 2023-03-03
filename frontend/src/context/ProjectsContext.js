import { createContext, useReducer } from 'react'

// make a new context and export it
export const ProjectsContext = createContext()

// Define function to update state for reducer hook
// state is previous state before change, 
//    action is the object passed to dispatch that defines change
export const projectsReducer = (state, action) => { 
  // dispatch function takes an "action" object: 
  //  type: describe the change to make
  //  payload: any data needed to make change
  // EX: dispatch({type: 'SET_PROJECTS', payload: [{}, {}]})

  switch(action.type) {
    case 'SET_PROJECTS':
      // If we want to set all projects, the paylod should be an array of project objects
      return {
        projects: action.payload // Return payload as new value of projects
      }
    case 'CREATE_PROJECT':
      // payload will be just one project to add
      return {
        // add new project to list, and spread old projects into list
        projects: [...state.projects, action.payload] 
      }
    case 'DELETE_PROJECT':
      // payload will be the project to delete
      return {
        // filter through current projects to remove one project
        projects: state.projects.filter((p) => {  // recieve each project as argument
          // return true to keep project, false to remove (if id is same as the one to delete)
          return p._id !== action.payload._id
        })
      }
    case 'UPDATE_PROJECT':
      // payload will be a project with updated fields
      for (var key in state.projects) {
        // Update the project that matches the id of the payload
        if (state.projects[key]._id === action.payload._id) {
          state.projects[key] = {...state.projects[key], ...action.payload}
        }
      }
      console.log(state.projects)
      return {
        projects: state.projects
      }

    default:
      return state
  }
}

// provide context to all components
// "children" is the child elements of this component whenver its used
export const ProjectsContextProvider = ({ children }) => {
  // use hook to locally keep track of any changes to projects (avoid fetching database)
  // Reducer hook is like state, but provides the dispatch function and lets you provide reducer function
  const [state, dispatch] = useReducer(projectsReducer, {
    // Initial value of state is an object with projects property
    projects: null
  })
  
  // Return a template - the project context provider
  return (
    // Wrap whatver parts of application that need access to the contex
    // make state and dispatch available for all 
    //  - spread state so that state's property (projects) is available
    <ProjectsContext.Provider value={{...state, dispatch}}> 
      {/* Wrap entire component tree - whole application */}
      { children } {/*In this case, children is <App /> */}
    </ProjectsContext.Provider>
  )
}