import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideNav from './components/SideNav'
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      {/* BrowserRouter component wraps everywhere where routes will be used */}
      <BrowserRouter>
        <SideNav />
        <div className="pages">
          {/* Routes component wraps indivual routes*/}
          <Routes>
            {/* Route component to create route - requires two props (path and element to render*/}
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/projects"
              element={<Projects />}
            />
            <Route
              path="/login"
              element={user ? <Home /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Home /> : <Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
