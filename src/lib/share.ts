import { UAParser } from 'ua-parser-js'
import { unicodeSplit } from './words'
import { MAX_CHALLENGES } from '../constants/settings'
import { GAME_TITLE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()
const gameUrl = 'wordletemplate.herokuapp.com'

export const shareStatus = (
  solution: string,
  solutionIndex: number,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  isPlayingRandom: boolean,
  handleShareToClipboard: () => void,
  handleShareFailure: () => void
) => {
  const textToShare = getTextToShare(solution, solutionIndex, guesses, lost,
    isHardMode, isDarkMode, isHighContrastMode, isPlayingRandom)
  
  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure)
      } else {
        handleShareFailure()
      }
    }
  } catch (error) {
    handleShareFailure()
  }
}

export const getTextToShare = (
  solution: string,
  solutionIndex: number,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  isPlayingRandom: boolean,
) => {
  const solutionIndexOrUnlimited = isPlayingRandom ? 'Unlimited' : solutionIndex
  return (
    `${GAME_TITLE} ${solutionIndexOrUnlimited} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
    generateEmojiGrid(
      solution,
      guesses,
      getEmojiTiles(false, isHighContrastMode)
    ) + '\n\n' +
    gameUrl
  )
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            default:
              return tiles[2]
          }
        })
        .join('')
    })
    .join('\n')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

export const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
