type Props = {
  timeMs: number
  isSpeedrunMode: boolean
}

const styles = {
  fontSize: '18px',
}

const classes = "flex justify-center mt-4 ml-2 mr-2 text-center dark:text-white"

export const StopwatchText = ({ timeMs, isSpeedrunMode }: Props) => {
  if (!isSpeedrunMode) {
    return <></>
  }
  
  const MS_IN_HOUR = 1000 * 60 * 60
  const MS_IN_DAY = MS_IN_HOUR * 24
  const getFormattedTime = () => {
    const days = Math.floor(timeMs / MS_IN_DAY)
    const hours = Math.floor((timeMs / MS_IN_HOUR) % 24)
    if (days > 0) {
      return "my grandma could have solved this faster than you"
    }
    const sliceStart = hours > 0 ? 11 : 14
    return new Date(timeMs).toISOString().slice(sliceStart, 22)
  }

  return (
    <div style={styles} className={classes}>
      {getFormattedTime()}
    </div>
  )
}
