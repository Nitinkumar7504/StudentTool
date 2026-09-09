const dns =
  require('dns')

dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
])


const express =
  require('express')

const mongoose =
  require('mongoose')

const cors =
  require('cors')

require('dotenv').config()


// =====================================================
// ROUTES
// =====================================================

const noteRoutes =
  require('./routes/noteRoutes')

const questionRoutes =
  require('./routes/questionRoutes')

const answerRoutes =
  require('./routes/answerRoutes')

const itemRoutes =
  require('./routes/itemRoutes')

const buyRequestRoutes =
  require('./routes/buyRequestRoutes')

const pdfRoutes =
  require('./routes/pdfRoutes')

const mergeRoutes =
  require('./routes/mergeRoutes')


// =====================================================
// EXPRESS APP
// =====================================================

const app =
  express()


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors()
)

app.use(
  express.json()
)


// =====================================================
// UPLOADS
// =====================================================

app.use(
  '/uploads',
  express.static('uploads')
)


// =====================================================
// HOME / API TEST
// =====================================================

app.get(
  '/',
  (req, res) => {
    res.json({
      message:
        'StudentTools API is running'
    })
  }
)


// =====================================================
// API ROUTES
// =====================================================

// Notes
app.use(
  '/api/notes',
  noteRoutes
)


// Questions
app.use(
  '/api/questions',
  questionRoutes
)


// Answers
app.use(
  '/api/answers',
  answerRoutes
)


// Marketplace Items
app.use(
  '/api/items',
  itemRoutes
)


// Marketplace Buy Requests
app.use(
  '/api/buy-requests',
  buyRequestRoutes
)


// PDF Tools
app.use(
  '/api/pdf',
  pdfRoutes
)


// Merge PDF
app.use(
  '/api/merge-pdf',
  mergeRoutes
)


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      'MongoDB connected successfully'
    )

    const PORT =
      process.env.PORT || 5000

    app.listen(
      PORT,
      () => {
        console.log(
          `Server is running on port ${PORT}`
        )
      }
    )

  })
  .catch((error) => {

    console.error(
      'MongoDB connection failed:'
    )

    console.error(
      error.message
    )

  })