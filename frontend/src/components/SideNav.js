import { Link } from 'react-router-dom'
import head from '../assets/images/head.jpg'
import resume from '../assets/files/Resume.pdf'
import { LinkedInIcon, GithubIcon, MailIcon, ResumeIcon, HouseIcon, PersonIcon, CodeIcon } from './Icons'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const { user, dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <section className="sidenav">

      <div className="container">
        <img src={ head } className="pfp" alt="me"></img>
      </div>
      <div className="container">
        <h1>Musa Azeem</h1>
      </div>

      <div className="container">
        <Link to="https://linkedin.com/in/mmazeem" target="_blank">
          <LinkedInIcon />
        </Link>
        <Link to="https://github.com/Musa-Azeem" target="_blank">
          <GithubIcon />
        </Link>
        <Link to="#"  // TODO fix
          onClick={(e) => {
            window.location.href = "musa.mazeem@gmail.com";
            e.preventDefault();
          }}
        >
          <MailIcon />
        </Link>
        <Link to={ resume } target="_blank">
          <ResumeIcon />
        </Link>
      </div>

      <hr className="navdivider"></hr>

      <ul className="navlinks">
        <li><Link to="/">
          <HouseIcon />
          <h1>Home</h1>
        </Link></li>
        <li><Link to="/about">
          <PersonIcon />
          <h1>About</h1>
        </Link></li>
        <li><Link to="/projects">
          <CodeIcon />
          <h1>Projects</h1>
        </Link></li>

        { user &&
          <li>
            <button onClick={logout}>
              Logout
            </button>
          </li>
        }
      </ul>
    </section>
  )
}

export default Navbar