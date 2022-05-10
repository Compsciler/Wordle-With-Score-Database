require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const path = require('path')

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../../build')))

  /*
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
  })
  */

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  })
}
