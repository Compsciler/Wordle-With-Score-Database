import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'
import { navigateAndRefresh } from '../../lib/navigation';

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  isPlayingRandom: boolean
  dailyPath: string
  randomPath: string
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
  isPlayingRandom,
  dailyPath,
  randomPath,
}: Props) => {
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="left-icons">
          <InformationCircleIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          {isPlayingRandom ? 
            <CalendarIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => navigateAndRefresh(dailyPath, navigate)}
            />
            :
            <Icon
              icon="ph:dice-five-bold"
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => navigateAndRefresh(randomPath, navigate)}
            />
          }
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        {/* <div className="flex">
          {ENABLE_ARCHIVED_GAMES && (
            <CalendarIcon
              className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsDatePickerModalOpen(true)}
            />
          )}
        </div> */}
        <div className="right-icons">
          <ChartBarIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
