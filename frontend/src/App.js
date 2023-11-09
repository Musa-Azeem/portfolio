import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useRef } from 'react'
import SideNav from './components/SideNav'
import Projects from './pages/Projects'
import About from './pages/About'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user } = useAuthContext()
  const projectsRef = useRef()
  const aboutRef = useRef()
  return (
    <div className="App">
      {/* BrowserRouter component wraps everywhere where routes will be used */}
      <BrowserRouter>
        <SideNav aboutRef={ aboutRef } projectsRef={ projectsRef }/>
        <div className="pages">
          {/* Routes component wraps indivual routes*/}
          <About ref={ aboutRef }/>
          <Projects ref={ projectsRef }/>
          <Login />
          {/* <Signup /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
