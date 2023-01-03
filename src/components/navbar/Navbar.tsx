import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { GAME_TITLE } from '../../constants/strings'
import { navigateAndRefresh } from '../../lib/navigation';

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  isPlayingRandom: boolean
  dailyPath: string
  randomPath: string
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  isPlayingRandom,
  dailyPath,
  randomPath,
}: Props) => {
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
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
        <p className="text-xl ml-2.5 font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
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
