import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >
        StudentTools
      </Link>

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/calculators">
          Calculators
        </Link>

        <Link to="/study-resources">
          Study Resources
        </Link>

        <Link to="/community">
          Community
        </Link>

        <Link to="/marketplace">
          Marketplace
        </Link>

        <Link to="/pdf-tools">
          PDF Tools
        </Link>

      </div>

    </nav>
  )
}

export default Navbar