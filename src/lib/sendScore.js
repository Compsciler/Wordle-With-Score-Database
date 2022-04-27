const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

const password = '<PASSWORD>'  // TODO: move to .env file
const url = `mongodb+srv://roger:${password}@wordlecluster.xrcmw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)
const scoreSchema = new mongoose.Schema({
    solutionIndex: Number,
    solution: String,
    guesses: [String],
    lost: Boolean,
    isHardMode: Boolean,
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
