import { useState } from 'react'
import './AttendanceCalculator.css'

function AttendanceCalculator() {

  const [attended, setAttended] = useState('')
  const [total, setTotal] = useState('')
  const [target, setTarget] = useState('75')

  const [currentPercentage, setCurrentPercentage] = useState(null)
  const [classesNeeded, setClassesNeeded] = useState(null)
  const [classesCanMiss, setClassesCanMiss] = useState(null)


  function calculateAttendance() {

    if (attended === '' || total === '' || target === '') {
      return
    }

    const attendedClasses = Number(attended)
    const totalClasses = Number(total)
    const targetPercentage = Number(target)


    // Validate input

    if (totalClasses <= 0) {
      return
    }

    if (attendedClasses < 0) {
      return
    }

    if (attendedClasses > totalClasses) {
      return
    }

    if (
      targetPercentage <= 0 ||
      targetPercentage > 100
    ) {
      return
    }


    // Calculate current attendance

    const percentage =
      (attendedClasses / totalClasses) * 100


    setCurrentPercentage(percentage)


    // Calculate classes needed to reach target

    if (percentage < targetPercentage) {

      const requiredClasses = Math.ceil(
        (
          targetPercentage * totalClasses
          - 100 * attendedClasses
        ) /
        (100 - targetPercentage)
      )

      setClassesNeeded(requiredClasses)

    } else {

      setClassesNeeded(0)

    }


    // Calculate classes that can be missed

    if (percentage >= targetPercentage) {

      const possibleMisses = Math.floor(
        (
          100 * attendedClasses / targetPercentage
        ) - totalClasses
      )

      setClassesCanMiss(
        Math.max(0, possibleMisses)
      )

    } else {

      setClassesCanMiss(0)

    }

  }


  return (
    <div className="attendance-page">

      <div className="attendance-card">

        <h1>Attendance Calculator</h1>

        <p>
          Calculate your attendance and find out how many
          classes you need to attend or can miss.
        </p>


        {/* Classes Attended */}

        <label>
          Classes Attended
        </label>

        <input
          type="number"
          min="0"
          placeholder="Enter classes attended"
          value={attended}
          onChange={(event) =>
            setAttended(event.target.value)
          }
        />


        {/* Total Classes */}

        <label>
          Total Classes
        </label>

        <input
          type="number"
          min="1"
          placeholder="Enter total classes"
          value={total}
          onChange={(event) =>
            setTotal(event.target.value)
          }
        />


        {/* Target Attendance */}

        <label>
          Target Attendance (%)
        </label>

        <input
          type="number"
          min="1"
          max="100"
          step="0.01"
          placeholder="Example: 75"
          value={target}
          onChange={(event) =>
            setTarget(event.target.value)
          }
        />


        {/* Calculate Button */}

        <button onClick={calculateAttendance}>
          Calculate Attendance
        </button>


        {/* Current Attendance */}

        {currentPercentage !== null && (

          <div className="attendance-result">

            <h2>
              Current Attendance:
              {' '}
              {currentPercentage.toFixed(2)}%
            </h2>


            {/* Classes Needed */}

            {classesNeeded > 0 && (

              <p>
                You need to attend{' '}
                <strong>
                  {classesNeeded}
                </strong>{' '}
                more consecutive classes to reach{' '}
                <strong>
                  {target}%
                </strong>.
              </p>

            )}


            {classesNeeded === 0 && (

              <p>
                You have already reached your target
                attendance of {target}%.
              </p>

            )}


            {/* Classes Can Miss */}

            {classesCanMiss > 0 && (

              <p>
                You can miss{' '}
                <strong>
                  {classesCanMiss}
                </strong>{' '}
                classes and still maintain at least{' '}
                <strong>
                  {target}%
                </strong>{' '}
                attendance.
              </p>

            )}

          </div>

        )}

      </div>

    </div>
  )
}

export default AttendanceCalculator