import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDiceFive } from '@fortawesome/fontawesome-free-solid'
// import { IconProp } from '@fortawesome/fontawesome-svg-core'
// import fas from '@fortawesome/fontawesome-free-solid'
import { Icon } from '@iconify/react';
import { GAME_TITLE } from '../../constants/strings'
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
  const navigateAndRefresh = (path: string) => {
    navigate(path)
    navigate(0)
  }
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
              onClick={() => navigateAndRefresh(dailyPath)}
            />
            :
            <Icon
              icon="ph:dice-five-bold"
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => navigateAndRefresh(randomPath)}
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
