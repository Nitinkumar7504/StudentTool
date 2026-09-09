import { useState } from 'react'
import './SGPACalculator.css'

function SGPACalculator() {

  const [subjects, setSubjects] = useState(1)

  const [credits, setCredits] = useState([0])

  const [grades, setGrades] = useState([''])

  const [result, setResult] = useState(null)


  // Grade letter to grade point
  const gradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'B+': 3.3,
    'B': 3.0,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'E': 0.7,
    'F': 0.0
  }


  // Change number of subjects
  function handleSubjectChange(event) {

    const count = Number(event.target.value)

    if (count < 1) {
      return
    }

    setSubjects(count)

    setCredits(
      Array(count).fill(0)
    )

    setGrades(
      Array(count).fill('')
    )

    setResult(null)
  }


  // Change credit
  function handleCreditChange(index, value) {

    const updatedCredits = [...credits]

    updatedCredits[index] = value

    setCredits(updatedCredits)

    setResult(null)
  }


  // Change grade
  function handleGradeChange(index, value) {

    const updatedGrades = [...grades]

    updatedGrades[index] = value

    setGrades(updatedGrades)

    setResult(null)
  }


  // Calculate SGPA
  function calculateSGPA() {

    let totalCredits = 0

    let totalCreditPoints = 0


    for (let i = 0; i < subjects; i++) {

      const credit = Number(credits[i])

      const grade = grades[i]


      // Check credit
      if (credit <= 0) {
        return
      }


      // Check grade
      if (grade === '') {
        return
      }


      const gradePoint = gradePoints[grade]


      totalCredits =
        totalCredits + credit


      totalCreditPoints =
        totalCreditPoints + (credit * gradePoint)
    }


    const sgpa =
      totalCreditPoints / totalCredits


    setResult(sgpa)
  }


  return (
    <div className="sgpa-page">

      <div className="sgpa-card">

        <h1>SGPA Calculator</h1>

        <p>
          Calculate your semester SGPA using credits and grades.
        </p>


        {/* Number of Subjects */}

        <label>
          Number of Subjects
        </label>

        <input
          type="number"
          min="1"
          value={subjects}
          onChange={handleSubjectChange}
        />


        {/* Subject Fields */}

        {credits.map((credit, index) => (

          <div
            key={index}
            className="subject-row"
          >

            <h3>
              Subject {index + 1}
            </h3>


            {/* Credit */}

            <label>
              Credit
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              value={credit}
              onChange={(event) =>
                handleCreditChange(
                  index,
                  event.target.value
                )
              }
            />


            {/* Grade */}

            <label>
              Grade
            </label>

            <select
              value={grades[index]}
              onChange={(event) =>
                handleGradeChange(
                  index,
                  event.target.value
                )
              }
            >

              <option value="">
                Select Grade
              </option>

              <option value="A+">
                A+
              </option>

              <option value="A">
                A
              </option>

              <option value="B+">
                B+
              </option>

              <option value="B">
                B
              </option>

              <option value="C+">
                C+
              </option>

              <option value="C">
                C
              </option>

              <option value="D">
                D
              </option>

              <option value="E">
                E
              </option>

              <option value="F">
                F
              </option>

            </select>

          </div>

        ))}


        {/* Calculate Button */}

        <button
          className="calculate-button"
          onClick={calculateSGPA}
        >
          Calculate SGPA
        </button>


        {/* Result */}

        {result !== null && (

          <h2 className="sgpa-result">
            Your SGPA: {result.toFixed(2)}
          </h2>

        )}

      </div>

    </div>
  )
}

export default SGPACalculator