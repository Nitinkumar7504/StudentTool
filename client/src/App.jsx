import { useState } from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


// =====================================================
// WELCOME / HOME
// =====================================================

import Welcome from './components/Welcome'
import Home from './components/Home'
import Navbar from './components/Navbar'


// =====================================================
// CALCULATORS
// =====================================================

import Calculators from './components/Calculators'
import PercentageCalculator from './components/PercentageCalculator'
import CGPACalculator from './components/CGPACalculator'
import SGPACalculator from './components/SGPACalculator'
import AttendanceCalculator from './components/AttendanceCalculator'


// =====================================================
// STUDY RESOURCES
// =====================================================

import StudyResources from './components/StudyResources'
import Notes from './components/Notes'
import ShareNotes from './components/ShareNotes'
import SearchNotes from './components/SearchNotes'


// =====================================================
// COMMUNITY
// =====================================================

import Community from './components/Community'
import AskQuestion from './components/AskQuestion'
import Questions from './components/Questions'
import MyQuestions from './components/MyQuestions'


// =====================================================
// MARKETPLACE
// =====================================================

import BrowseItems from './components/BrowseItems'
import SellItem from './components/SellItem'
import MyListings from './components/MyListings'
import BuyRequests from './components/BuyRequests'


// =====================================================
// PDF TOOLS
// =====================================================

import PDFTools from './components/PDFTools'
import WordToPDF from './components/WordToPDF'
import PDFToWord from './components/PDFToWord'
import MergePDF from './components/MergePDF'


// =====================================================
// APP
// =====================================================

function App() {

  const [showHome, setShowHome] =
    useState(
      localStorage.getItem(
        'studentName'
      ) !== null
    )


  // ===================================================
  // WELCOME SCREEN
  // ===================================================

  if (!showHome) {

    return (
      <Welcome
        onEnter={() =>
          setShowHome(true)
        }
      />
    )

  }


  // ===================================================
  // MAIN APP
  // ===================================================

  return (

    <BrowserRouter>

      <Navbar />


      <Routes>


        {/* ============================================
            HOME
        ============================================ */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ============================================
            CALCULATORS
        ============================================ */}

        <Route
          path="/calculators"
          element={<Calculators />}
        />

        <Route
          path="/calculators/percentage"
          element={<PercentageCalculator />}
        />

        <Route
          path="/calculators/cgpa"
          element={<CGPACalculator />}
        />

        <Route
          path="/calculators/sgpa"
          element={<SGPACalculator />}
        />

        <Route
          path="/calculators/attendance"
          element={<AttendanceCalculator />}
        />


        {/* ============================================
            STUDY RESOURCES
        ============================================ */}

        <Route
          path="/study-resources"
          element={<StudyResources />}
        />

        <Route
          path="/study-resources/notes"
          element={<Notes />}
        />

        <Route
          path="/study-resources/share"
          element={<ShareNotes />}
        />

        <Route
          path="/study-resources/search"
          element={<SearchNotes />}
        />


        {/* ============================================
            COMMUNITY
        ============================================ */}

        <Route
          path="/community"
          element={<Community />}
        />

        <Route
          path="/community/ask"
          element={<AskQuestion />}
        />

        <Route
          path="/community/questions"
          element={<Questions />}
        />

        <Route
          path="/community/my-questions"
          element={<MyQuestions />}
        />


        {/* ============================================
            MARKETPLACE
        ============================================ */}

        <Route
          path="/marketplace"
          element={<BrowseItems />}
        />

        <Route
          path="/marketplace/sell"
          element={<SellItem />}
        />

        <Route
          path="/marketplace/my-listings"
          element={<MyListings />}
        />

        <Route
          path="/marketplace/buy-requests"
          element={<BuyRequests />}
        />


        {/* ============================================
            PDF TOOLS
        ============================================ */}

        <Route
          path="/pdf-tools"
          element={<PDFTools />}
        />

        <Route
          path="/pdf-tools/word-to-pdf"
          element={<WordToPDF />}
        />

        <Route
          path="/pdf-tools/pdf-to-word"
          element={<PDFToWord />}
        />

        <Route
          path="/pdf-tools/merge"
          element={<MergePDF />}
        />


      </Routes>

    </BrowserRouter>

  )
}


export default App