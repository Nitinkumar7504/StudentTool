import { useState } from 'react'
import './SearchNotes.css'

function SearchNotes() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(event) {
    event.preventDefault()

    setError('')
    setSearched(true)

    if (!search.trim()) {
      setNotes([])
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `https://studenttool.onrender.com/api/notes?search=${encodeURIComponent(
          search.trim()
        )}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Could not search notes.'
        )
      }

      setNotes(data.notes || [])
    } catch (error) {
      console.error('Search notes error:', error)

      setError(
        error.message ||
        'Could not search notes.'
      )

      setNotes([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-notes-page">
      <div className="search-notes-container">

        <div className="search-notes-header">
          <h1>Search Notes</h1>

          <p>
            Search study notes by title or subject.
          </p>
        </div>

        <form
          className="search-notes-form"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

        {loading && (
          <div className="search-notes-message">
            Searching...
          </div>
        )}

        {!loading && error && (
          <div className="search-notes-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          searched &&
          search.trim() &&
          notes.length === 0 && (
            <div className="search-notes-empty">
              <h2>No notes found</h2>

              <p>
                Try searching with a different title or subject.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          notes.length > 0 && (
            <div className="search-notes-grid">

              {notes.map(note => (
                <div
                  className="search-note-card"
                  key={note._id}
                >
                  <h2>
                    {note.title}
                  </h2>

                  {note.subject && (
                    <p>
                      <strong>Subject:</strong>{' '}
                      {note.subject}
                    </p>
                  )}

                  {note.semester && (
                    <p>
                      <strong>Semester:</strong>{' '}
                      {note.semester}
                    </p>
                  )}

                  {note.description && (
                    <p>
                      {note.description}
                    </p>
                  )}

                  {note.fileUrl && (
                    <a
                      href={
                        note.fileUrl.startsWith('http')
                          ? note.fileUrl
                          : `https://studenttool.onrender.com${note.fileUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="search-download-button"
                    >
                      Download Note
                    </a>
                  )}
                </div>
              ))}

            </div>
          )}

      </div>
    </div>
  )
}

export default SearchNotes