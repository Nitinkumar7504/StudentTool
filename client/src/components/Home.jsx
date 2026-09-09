import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-page">

      <header className="home-header">

        <h1>StudentTools</h1>

        <p>
          Everything students need in one place.
        </p>

      </header>


      <main className="tools-container">

        {/* Calculators */}
        <div className="tool-card">

          <h2>Calculators</h2>

          <p>
            CGPA, SGPA, Attendance, Percentage and more.
          </p>

          <Link
            to="/calculators"
            className="home-button"
          >
            Explore Calculators
          </Link>

        </div>


        {/* Study Resources */}
        <div className="tool-card">

          <h2>Study Resources</h2>

          <p>
            Share, browse and download study notes.
          </p>

          <Link
            to="/study-resources"
            className="home-button"
          >
            Explore Resources
          </Link>

        </div>


        {/* Community */}
        <div className="tool-card">

          <h2>Community</h2>

          <p>
            Ask questions and help other students.
          </p>

          <Link
            to="/community"
            className="home-button"
          >
            Visit Community
          </Link>

        </div>


        {/* Marketplace */}
        <div className="tool-card">

          <h2>Marketplace</h2>

          <p>
            Buy and sell used books and study items.
          </p>

          <Link
            to="/marketplace"
            className="home-button"
          >
            Visit Marketplace
          </Link>

        </div>


        {/* PDF Tools */}
        <div className="tool-card">

          <h2>PDF Tools</h2>

          <p>
            Convert, merge, split and manage PDF files.
          </p>

          <Link
            to="/pdf-tools"
            className="home-button"
          >
            Explore PDF Tools
          </Link>

        </div>

      </main>

    </div>
  )
}

export default Home