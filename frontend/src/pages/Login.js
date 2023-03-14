import { useState } from 'react'
import { SRV_URL } from '../config'
import { useAuthContext } from '../hooks/useAuthContext'
import path from 'path-browserify'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Login
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)
  
    const response = await fetch(path.join(SRV_URL, 'user/login'), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
  
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return (
    <section className="loginCard">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        
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

        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{ error }</div>}
      </form>
    </section>
  )
}

export default Login