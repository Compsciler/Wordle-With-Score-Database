import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { getTextToShare, shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  solutionIndex: number
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
  isPlayingExample: boolean
  isManualShareText: boolean
}

export const StatsModal = ({
  isOpen,
  handleClose,
  solution,
  solutionIndex,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
  isPlayingExample,
  isManualShareText,
}: Props) => {
  const textToShare = getTextToShare(solution, solutionIndex, guesses, isGameLost,
    isHardMode, isDarkMode, isHighContrastMode)
  
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {isPlayingExample && (
        <div className="mt-5 dark:text-white">
          <h5>(Statistics not affected by example games)</h5>
        </div>
      )}
      {(isGameLost || isGameWon) && (
        <>
          <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
            <div>
              <h5>{NEW_WORD_TEXT}</h5>
              <Countdown
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
                date={tomorrow}
                daysInHours={true}
              />
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(
                  solution,
                  solutionIndex,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  handleShareToClipboard
                )
              }}
            >
              {SHARE_TEXT}
            </button>
          </div>
          {(isManualShareText) && (
            <>
              <br />
              <div className="bg-gray-200 dark:bg-gray-600 dark:text-gray-100 rounded-lg" style={{whiteSpace: "pre-wrap"}}>
                {textToShare}
              </div>
            </>
          )}
        </>
      )}
    </BaseModal>
  )
}
