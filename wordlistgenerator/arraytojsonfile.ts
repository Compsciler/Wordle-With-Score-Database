import * as fs from 'fs';
import { WORDS } from './constants/oldwordlist'
import { VALID_GUESSES } from './constants/oldvalidGuesses'

const arrayToJsonFile = (arr: string[], writeFilePath: string) => {
    const data = JSON.stringify(arr)
    fs.writeFile(writeFilePath, data, (err) => {
        if (err) throw err;
    })
}

arrayToJsonFile(WORDS, 'constants/oldwordlist.json')
arrayToJsonFile(VALID_GUESSES, 'constants/oldvalidGuesses.json')
