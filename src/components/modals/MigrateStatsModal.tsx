import { useState } from 'react'

import { GameStats, StoredGameState } from '../../lib/localStorage'
import { EmigratePanel } from '../stats/EmigratePanel'
import { ImmigratePanel } from '../stats/ImmigratePanel'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export type MigrationStats = {
  statistics: GameStats
  gameState: StoredGameState | null
}

export const MigrateStatsModal = ({ isOpen, handleClose }: Props) => {
  const [isEmigrateVisible, setIsEmigrateVisible] = useState(true)

  return (
    <BaseModal
      title="Transfer your statistics"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="mt-4 mb-4 text-sm text-gray-500 dark:text-gray-300">
        Copy the migration code on your old device and paste into the input on
        the new device.
      </p>

      <div className="w-full columns-3 gap-0">
        <div className="mb-4 flex items-center">
          <p className="mb-0 flex text-sm font-medium text-gray-900 dark:text-gray-300">
            This is my:
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <input
            checked={isEmigrateVisible}
            onChange={() => setIsEmigrateVisible(true)}
            id="emigrate-radio-button"
            radioGroup="migrate-radio-buttons"
            type="radio"
            value=""
            name="emigrate-radio-button"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="emigrate-radio-button"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            old device
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={!isEmigrateVisible}
            onChange={() => setIsEmigrateVisible(false)}
            id="immigrate-radio-button"
            radioGroup="migrate-radio-buttons"
            type="radio"
            value=""
            name="immigrate-radio-button"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="immigrate-radio-button"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            new device
          </label>
        </div>
      </div>

      {isEmigrateVisible && <EmigratePanel />}
      {!isEmigrateVisible && <ImmigratePanel />}
    </BaseModal>
  )
}
