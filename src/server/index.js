require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const path = require('path')
const helmet = require("helmet");

const url = process.env.MONGODB_URI

mongoose.connect(url)
const scoreSchema = new mongoose.Schema({
    solutionIndex: Number,
    solution: String,
    guesses: [String],
    lost: Boolean,
    isHardMode: Boolean,
    emojiGrid: String
})

const Score = mongoose.model('Score', scoreSchema)

app.post('/api/scores', (req, res) => {
    const score = new Score(req.body)

    score.save().then(savedScore => {
        res.json(savedScore)
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(express.static(path.join(__dirname, "../build")))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

/*
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
*/

const scriptSources = ["'self'", "'unsafe-inline'", 'https://ssl.google-analytics.com', 'https://www.pagespeed-mod.com']
const styleSources = ["'self'", 'https://fonts.googleapis.com']
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      styleSrc: styleSources,
    },
  })
)
