import { useEffect, createContext, useReducer } from 'react'

// Context to save and modify user logged in state

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // set logged in user to the payload user
      return { user: action.payload } 
    case 'LOGOUT':
      // no logged in user
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null  // initial state is null - not logged in 
  })

  // on refresh, check if user is already saved in local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) 

    // If a user was found, login with that user
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  // provide authContext context to all parts of app
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}