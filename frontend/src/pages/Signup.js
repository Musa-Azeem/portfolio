import { useState } from 'react'
import { SIGNUP_URL } from '../config'
import { useAuthContext } from '../hooks/useAuthContext'
import path from 'path-browserify'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handle signup
  const [error, setError] = useState(null)          // error received from backend
  const [isLoading, setIsLoading] = useState(null)  // for loading bar while sign up is happening in the backend
  const { dispatch } = useAuthContext()             // to update local user context

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)  
    setError(null)

    // send sign up request to backend
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }) // turn email and password into json string
    })
    const json = await response.json() // get response - email & json web token or error

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)  // set error with error message
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))  // store token for if user closes/opens tab

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})  // send email and token to set auth context

      // update loading state
      setIsLoading(false)
    }
 
  }

  return (
    <section className="loginCard">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        
        <div className="row">
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            placeholder="Email"
          />
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Password"
          />
        </div>

        {/* disable button if loading - show error if there is one */}
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{ error }</div>}
      </form>
    </section>
  )
}

export default Signup