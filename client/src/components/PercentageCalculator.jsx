import { useState } from 'react'
import './PercentageCalculator.css'

function PercentageCalculator() {

  const [value, setValue] = useState('')
  const [total, setTotal] = useState('')
  const [result, setResult] = useState(null)

  function calculatePercentage() {

    if (value === '' || total === '') {
      return
    }

    if (Number(total) === 0) {
      return
    }

    const percentage =
      (Number(value) / Number(total)) * 100

    setResult(percentage)
  }

  return (
    <div className="percentage-page">

      <div className="percentage-card">

        <h1>Percentage Calculator</h1>

        <p>
          Calculate your percentage easily.
        </p>

        <input
          type="number"
          placeholder="Enter obtained marks"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <input
          type="number"
          placeholder="Enter total marks"
          value={total}
          onChange={(event) => setTotal(event.target.value)}
        />

        <button onClick={calculatePercentage}>
          Calculate
        </button>

        {result !== null && (
          <h2>
            Result: {result.toFixed(2)}%
          </h2>
        )}

      </div>

    </div>
  )
}

export default PercentageCalculator