import Countdown from 'react-countdown'
import { ShareIcon } from '@heroicons/react/outline'
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
import { MigrationIntro } from '../stats/MigrationIntro'
import { ENABLE_MIGRATE_STATS } from '../../constants/settings'

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
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
  isPlayingExample: boolean
  isPlayingRandom: boolean
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
  handleMigrateStatsButton,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
  isPlayingExample,
  isPlayingRandom,
  isManualShareText,
}: Props) => {
  const textToShare = getTextToShare(solution, solutionIndex, guesses, isGameLost,
    isHardMode, isDarkMode, isHighContrastMode, isPlayingRandom)
  
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
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
      {isPlayingRandom && (
        <div className="mt-5 dark:text-white">
          <h5>(Statistics not affected by random games)</h5>
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
            <div>
              <button
                type="button"
                className="inline-flex justify-center items-center text-center mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  shareStatus(
                    solution,
                    solutionIndex,
                    guesses,
                    isGameLost,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    isPlayingRandom,
                    handleShareToClipboard
                  )
                }}
              >
                <ShareIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white" />
                {SHARE_TEXT}
              </button>
            </div>
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
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 -mb-4 border-gray-500" />
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        </div>
      )}
    </BaseModal>
  )
}
