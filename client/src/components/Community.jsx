import { Link } from 'react-router-dom'
import './Community.css'


function Community() {

  return (

    <div className="community-page">


      <div className="community-header">

        <h1>
          Student Community
        </h1>

        <p>
          Ask questions, share answers,
          and help other students.
        </p>

      </div>


      <div className="community-actions">


        {/* ASK QUESTION */}

        <Link
          to="/community/ask"
          className="community-card"
        >

          <h2>
            Ask a Question
          </h2>

          <p>
            Ask other students for help.
          </p>

        </Link>


        {/* BROWSE QUESTIONS */}

        <Link
          to="/community/questions"
          className="community-card"
        >

          <h2>
            Browse Questions
          </h2>

          <p>
            View questions asked by students.
          </p>

        </Link>


        {/* GIVE ANSWERS */}

        <Link
          to="/community/questions"
          className="community-card"
        >

          <h2>
            Give Answers
          </h2>

          <p>
            Help other students by answering questions.
          </p>

        </Link>


        {/* MY QUESTIONS */}

        <Link
          to="/community/my-questions"
          className="community-card"
        >

          <h2>
            My Questions
          </h2>

          <p>
            View questions you have asked.
          </p>

        </Link>


      </div>

    </div>

  )

}


export default Community