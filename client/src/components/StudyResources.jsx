import { Link } from 'react-router-dom'
import './StudyResources.css'

function StudyResources() {
  return (
    <div className="resources-page">

      <div className="resources-header">

        <h1>Study Resources</h1>

        <p>
          Find, share and download study notes.
        </p>

      </div>


      <div className="resources-grid">

        {/* Browse Notes */}
        <div className="resource-card">

          <h2>Browse Notes</h2>

          <p>
            Browse study notes shared by other students.
          </p>

          <Link
            to="/study-resources/notes"
            className="resource-button"
          >
            Browse Notes
          </Link>

        </div>


        {/* Search Notes */}
        <div className="resource-card">

          <h2>Search Notes</h2>

          <p>
            Search notes by subject, course or topic.
          </p>

          <Link
            to="/study-resources/search"
            className="resource-button"
          >
            Search Notes
          </Link>

        </div>


        {/* Share Notes */}
        <div className="resource-card">

          <h2>Share Notes</h2>

          <p>
            Upload and share your notes with other students.
          </p>

          <Link
            to="/study-resources/share"
            className="resource-button"
          >
            Share Notes
          </Link>

        </div>


        {/* Download Notes */}
        <div className="resource-card">

          <h2>Download Notes</h2>

          <p>
            Download useful notes for your studies.
          </p>

          <Link
            to="/study-resources/notes"
            className="resource-button"
          >
            Download Notes
          </Link>

        </div>

      </div>

    </div>
  )
}

export default StudyResources