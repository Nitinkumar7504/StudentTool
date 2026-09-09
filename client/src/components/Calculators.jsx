import { Link } from 'react-router-dom'
import './Calculators.css'

function Calculators() {
    return (
        <div className="calculators-page">

            <div className="calculators-header">

                <h1>Calculators</h1>

                <p>
                    Useful calculators for students.
                </p>

            </div>

            <div className="calculators-grid">

                {/* Percentage Calculator */}
                <div className="calculator-card">

                    <h2>Percentage Calculator</h2>

                    <p>
                        Calculate percentage from your marks.
                    </p>

                    <Link
                        to="/calculators/percentage"
                        className="calculator-button"
                    >
                        Open Calculator
                    </Link>

                </div>


                {/* CGPA Calculator */}
                <div className="calculator-card">

                    <h2>CGPA Calculator</h2>

                    <p>
                        Calculate your overall CGPA.
                    </p>

                    <Link
                        to="/calculators/cgpa"
                        className="calculator-button"
                    >
                        Open Calculator
                    </Link>

                </div>


                {/* SGPA Calculator */}
                <div className="calculator-card">

                    <h2>SGPA Calculator</h2>

                    <p>
                        Calculate your semester SGPA.
                    </p>

                    <Link
                        to="/calculators/sgpa"
                        className="calculator-button"
                    >
                        Open Calculator
                    </Link>

                </div>


                {/* Attendance Calculator */}
                <div className="calculator-card">

                    <h2>Attendance Calculator</h2>

                    <p>
                        Calculate your attendance percentage.
                    </p>

                    <Link
                        to="/calculators/attendance"
                        className="calculator-button"
                    >
                        Open Calculator
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Calculators