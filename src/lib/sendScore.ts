const mongoose = require('mongoose')
const password = '<PASSWORD>'
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

export const sendScore = (solutionIndex: number, solution: string, guesses: string[], lost: boolean, isHardMode: boolean) => {
    const score = new Score({
        solutionIndex: solutionIndex,
        solution: solution,
        guesses: guesses,
        lost: lost,
        isHardMode: isHardMode,
    })
    
    score.save().then(() => {
        console.log('Score sent')
    })
}
