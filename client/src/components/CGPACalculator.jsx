import { useState } from 'react'
import './CGPACalculator.css'

function CGPACalculator() {

  const [subjects, setSubjects] = useState(1)
  const [grades, setGrades] = useState([''])
  const [result, setResult] = useState(null)

  function handleSubjectChange(event) {
    const count = Number(event.target.value)

    setSubjects(count)

    setGrades(
      Array(count).fill('')
    )

    setResult(null)
  }

  function handleGradeChange(index, value) {

    const updatedGrades = [...grades]

    updatedGrades[index] = value

    setGrades(updatedGrades)

    setResult(null)
  }

  function calculateCGPA() {

    if (grades.some((grade) => grade === '')) {
      return
    }

    const total = grades.reduce(
      (sum, grade) => sum + Number(grade),
      0
    )

    const cgpa = total / grades.length

    setResult(cgpa)
  }

  return (
    <div className="cgpa-page">

      <div className="cgpa-card">

        <h1>CGPA Calculator</h1>

        <p>
          Calculate your CGPA using your subject grade points.
        </p>

        <label>
          Number of Subjects
        </label>

        <input
          type="number"
          min="1"
          value={subjects}
          onChange={handleSubjectChange}
        />

        {grades.map((grade, index) => (
          <div key={index}>

            <label>
              Subject {index + 1} Grade Point
            </label>

            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              placeholder="Enter grade point"
              value={grade}
              onChange={(event) =>
                handleGradeChange(
                  index,
                  event.target.value
                )
              }
            />

          </div>
        ))}

        <button onClick={calculateCGPA}>
          Calculate CGPA
        </button>

        {result !== null && (
          <h2>
            Your CGPA: {result.toFixed(2)}
          </h2>
        )}

      </div>

    </div>
  )
}

export default CGPACalculator