import { Link } from 'react-router-dom'
import head from '../assets/images/head.jpg'
import resume from '../assets/files/Resume.pdf'
import { LinkedInIcon, GithubIcon, MailIcon, ResumeIcon, HouseIcon, PersonIcon, CodeIcon } from './Icons'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = ({ aboutRef, projectsRef }) => {
  const { user, dispatch } = useAuthContext()

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({behavior: "smooth"})
    }
  }

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
        {/* <li>
          <HouseIcon />
          <h1>Home</h1>
        </li> */}
        <li><div className="nav-link">
          <PersonIcon />
          <h1 onClick={ () => scrollToRef(aboutRef) }>About</h1>
        </div></li>
        <li><div className="nav-link">
          <CodeIcon />
          <h1 onClick={ () => scrollToRef(projectsRef) }>Projects</h1>
        </div></li>

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