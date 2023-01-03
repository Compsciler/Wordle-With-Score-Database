import './App.css'
import './App.css'

import { ClockIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { useMatch, useNavigate } from 'react-router-dom'

import { AlertContainer } from './components/alerts/AlertContainer'
import { RandomGameText } from './components/gametext/RandomGameText'
import { StopwatchText } from './components/gametext/StopwatchText'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { DatePickerModal } from './components/modals/DatePickerModal'
import { InfoModal } from './components/modals/InfoModal'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { StatsModal } from './components/modals/StatsModal'
import { Navbar } from './components/navbar/Navbar'
import { exampleIds } from './constants/exampleIds'
import {
  DATE_LOCALE,
  DISCOURAGE_INAPP_BROWSERS,
  LONG_ALERT_TIME_MS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS as REVEAL_TIME_MS_NORMAL,
  REVEAL_TIME_MS_SPEEDRUN,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  CORRECT_WORD_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
  GAME_COPIED_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  SHARE_FAILURE_TEXT,
  WIN_MESSAGES,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { WORDS } from './constants/wordlist'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import {
  getStoredIsHighContrastMode,
  loadGameOfDayStateFromLocalStorage,
  loadGameStateFromLocalStorage,
  saveGameOfDayStateToLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
} from './lib/localStorage'
import { navigateAndRefresh } from './lib/navigation'
import { generateEmojiGrid, getEmojiTiles } from './lib/share'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  findFirstUnusedReveal,
  getGameDate,
  getIsLatestGame,
  isWinningWord,
  isWinningWordOfDay,
  isWordInWordList,
  setGameDate,
  solutionIndex as solutionIndexOfDay,
  solution as solutionOfDay,
  unicodeLength,
} from './lib/words'
import { getWordBySolutionIndex } from './lib/words'
import scoreService from './services/scores'

function App() {
  const navigate = useNavigate()
  const dailyPath = '/'
  const examplePath = '/examples/:id'
  const randomPath = '/random'
  const isPlayingDaily = useMatch(dailyPath) !== null
  const exampleMatch = useMatch(examplePath)
  const randomMatch = useMatch(randomPath)
  const isPlayingExample = exampleMatch !== null
  const isPlayingRandom = randomMatch !== null
  const isNotPlayingDaily = isPlayingExample || isPlayingRandom
  let exampleSolution = undefined
  let exampleSolutionIndex = undefined
  let isReturningExampleNotFoundPage = false
  const [randomId, setRandomId] = useState(-1)

  if (exampleMatch) {
    const id = parseInt(exampleMatch.params.id!)
    if (!exampleIds.includes(id)) {
      isReturningExampleNotFoundPage = true
    }
    if (!Number.isNaN(id)) {
      const exampleSolutionAndIndex = getWordBySolutionIndex(id)
      exampleSolution = exampleSolutionAndIndex.solution
      exampleSolutionIndex = exampleSolutionAndIndex.solutionIndex
      if (exampleSolutionIndex === -1) {
        isReturningExampleNotFoundPage = true
      }
    }
  } else if (randomMatch) {
    const exampleSolutionAndIndex = getWordBySolutionIndex(randomId)
    exampleSolution = exampleSolutionAndIndex.solution
    exampleSolutionIndex = exampleSolutionAndIndex.solutionIndex
  }
  const solution =
    exampleSolution !== undefined ? exampleSolution : solutionOfDay
  const solutionIndex =
    exampleSolutionIndex !== undefined
      ? exampleSolutionIndex
      : solutionIndexOfDay

  const isLatestGame = getIsLatestGame()
  const gameDate = getGameDate()
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isSolutionTextOpen, setIsSolutionTextOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isSpeedrunMode, setIsSpeedrunMode] = useState(
    localStorage.getItem('speedrunMode')
      ? localStorage.getItem('speedrunMode') === 'on'
      : false
  )
  // To export to other component in future, see https://stackoverflow.com/questions/66727049/exporting-a-state-from-hook-function-to-another-component
  const REVEAL_TIME_MS = isSpeedrunMode
    ? REVEAL_TIME_MS_SPEEDRUN
    : REVEAL_TIME_MS_NORMAL

  const [isManualShareText, setIsManualShareText] = useState(
    localStorage.getItem('manualShare')
      ? localStorage.getItem('manualShare') === 'on'
      : false
  )
  const [isRevealing, setIsRevealing] = useState(false)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)
  const [timeMs, setTimeMs] = useState(0)

  const [guessesOfDay, setGuessesOfDay] = useState<string[]>(() => {
    const loaded = loadGameOfDayStateFromLocalStorage()
    if (!loaded) {
      return []
    }
    return loaded.guesses
  })
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = isPlayingDaily
      ? loadGameOfDayStateFromLocalStorage()
      : loadGameStateFromLocalStorage(isLatestGame)
    if (loaded?.solution !== solution) {
      if (isPlayingDaily) {
        setGuessesOfDay([])
      }
      // Reset other game state variables here (if not already reset by useState)
      return []
    }
    // Load other game state variables here and below
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
      setIsSolutionTextOpen(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      })
      setIsSolutionTextOpen(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage(true)) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  })

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handleSpeedrunMode = (isSpeedrun: boolean) => {
    setIsSpeedrunMode(isSpeedrun)
    localStorage.setItem('speedrunMode', isSpeedrun ? 'on' : 'off')
  }

  const handleManualShareText = (isManual: boolean) => {
    setIsManualShareText(isManual)
    localStorage.setItem('manualShare', isManual ? 'on' : 'off')
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution })
  }, [guesses])
  useEffect(() => {
    if (!isPlayingDaily) {
      return
    }
    saveGameOfDayStateToLocalStorage({ guesses, solution })
  }, [guessesOfDay])

  const isGameComplete = isGameWon || isGameLost
  useEffect(() => {
    const delayMs = REVEAL_TIME_MS * solution.length
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, (solution.length + 1) * REVEAL_TIME_MS)
    }

    if (isGameComplete) {
      setTimeout(() => {
        setIsSolutionTextOpen(true)
      }, delayMs)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  useEffect(() => {
    setIsStopwatchRunning(guesses.length >= 1 && !isGameComplete)
  }, [guesses, isGameComplete])

  useEffect(() => {
    const timeIncrementMs = 10
    let interval: NodeJS.Timeout | null = null

    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setTimeMs((timeMs) => timeMs + timeIncrementMs)
      }, timeIncrementMs)
    } else if (interval !== null) {
      clearInterval(interval)
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [isStopwatchRunning])

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * WORDS.length))
  }, [randomMatch])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isSolutionTextOpen) {
      if (isPlayingRandom) {
        navigateAndRefresh(randomPath, navigate)
      }
      return
    }

    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(
        currentGuess,
        guesses,
        solution
      )
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = isNotPlayingDaily
      ? isWinningWord(currentGuess, solution)
      : isWinningWordOfDay(currentGuess)

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      const guessesIncludingCurrent = guesses.concat(currentGuess)

      setGuesses([...guesses, currentGuess])
      if (isPlayingDaily) {
        setGuessesOfDay([...guesses, currentGuess])
      }
      setCurrentGuess('')

      if (winningWord) {
        if (!isNotPlayingDaily) {
          setStats(addStatsForCompletedGame(stats, guesses.length))
        }
        sendScore(
          solutionIndex,
          solution,
          guessesIncludingCurrent,
          false,
          isHardMode
        )
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length))
        }
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (!isNotPlayingDaily) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        }
        sendScore(
          solutionIndex,
          solution,
          guessesIncludingCurrent,
          true,
          isHardMode
        )
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        }
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        })
      }
    }
  }

  const sendScore = (
    solutionIndex: number,
    solution: string,
    guesses: string[],
    lost: boolean,
    isHardMode: boolean
  ) => {
    // event.preventDefault()
    const emojiGrid = generateDefaultEmojiGrid(solution, guesses)
    const scoreObject = {
      solutionIndex,
      solution,
      guesses,
      lost,
      isHardMode,
      emojiGrid,
    }

    scoreService.create(scoreObject).then((res) => {
      console.log(res)
    })
  }

  const generateDefaultEmojiGrid = (solution: string, guesses: string[]) => {
    return generateEmojiGrid(solution, guesses, getEmojiTiles(false, false))
  }

  if (isReturningExampleNotFoundPage) {
    return (
      <p className="mt-4 flex justify-center text-lg dark:text-white">
        ERROR: EXAMPLE NOT FOUND
      </p>
    )
  }

  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          isPlayingRandom={isPlayingRandom}
          dailyPath={dailyPath}
          randomPath={randomPath}
        />

        {!isLatestGame && (
          <div className="flex items-center justify-center">
            <ClockIcon className="h-6 w-6 stroke-gray-600 dark:stroke-gray-300" />
            <p className="text-base text-gray-600 dark:text-gray-300">
              {format(gameDate, 'd MMMM yyyy', { locale: DATE_LOCALE })}
            </p>
          </div>
        )}

        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col justify-center pb-6 short:pb-2">
            <Grid
              solution={solution}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
            isRevealing={isRevealing}
          />
          <StopwatchText timeMs={timeMs} />
          <RandomGameText
            isPlayingRandom={isPlayingRandom}
            isGameAnimationComplete={isSolutionTextOpen}
          />
        </div>
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          solution={solution}
          solutionIndex={solutionIndex}
          guesses={guesses}
          gameStats={stats}
          isLatestGame={isLatestGame}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          handleShareFailure={() =>
            showErrorAlert(SHARE_FAILURE_TEXT, {
              durationMs: LONG_ALERT_TIME_MS,
            })
          }
          handleMigrateStatsButton={() => {
            setIsStatsModalOpen(false)
            setIsMigrateStatsModalOpen(true)
          }}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
          isPlayingExample={isPlayingExample}
          isPlayingRandom={isPlayingRandom}
          isManualShareText={isManualShareText}
        />
        <DatePickerModal
          isOpen={isDatePickerModalOpen}
          handleSelectDate={(d) => {
            setIsDatePickerModalOpen(false)
            setGameDate(d)
          }}
          handleClose={() => setIsDatePickerModalOpen(false)}
        />
        <MigrateStatsModal
          isOpen={isMigrateStatsModalOpen}
          handleClose={() => setIsMigrateStatsModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
          isSpeedrunMode={isSpeedrunMode}
          handleSpeedrunMode={handleSpeedrunMode}
          isManualShareText={isManualShareText}
          handleManualShareText={handleManualShareText}
        />
        <AlertContainer />
      </div>
    </Div100vh>
  )
}

export default App
