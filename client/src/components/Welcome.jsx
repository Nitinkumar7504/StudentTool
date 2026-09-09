import { useState } from 'react'
import './Welcome.css'

function Welcome({ onEnter }) {

  const [name, setName] = useState(
    localStorage.getItem('studentName') || ''
  )

  function handleSubmit() {

    if (name.trim() === '') {
      return
    }

    localStorage.setItem('studentName', name.trim())

    onEnter()
  }

  return (
    <div className="welcome-page">

      <div className="welcome-card">

        <h1>Welcome to StudentTools 👋</h1>

        <p className="welcome-text">
          Everything students need in one place.
        </p>

        <label htmlFor="name">
          What is your name?
        </label>

        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button onClick={handleSubmit}>
          Enter
        </button>

      </div>

    </div>
  )
}

export default Welcome