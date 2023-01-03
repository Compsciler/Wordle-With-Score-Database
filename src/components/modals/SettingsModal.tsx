import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  MANUAL_SHARE_TEXT_DESCRIPTION,
  SPEEDRUN_MODE_DESCRIPTION,
} from '../../constants/strings'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isSpeedrunMode: boolean
  handleSpeedrunMode: Function
  isManualShareText: boolean
  handleManualShareText: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isSpeedrunMode,
  handleSpeedrunMode,
  isManualShareText,
  handleManualShareText,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Speedrun Mode"
          flag={isSpeedrunMode}
          handleFlag={handleSpeedrunMode}
          description={SPEEDRUN_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Manual Share Text"
          flag={isManualShareText}
          handleFlag={handleManualShareText}
          description={MANUAL_SHARE_TEXT_DESCRIPTION}
        />
      </div>
    </BaseModal>
  )
}
