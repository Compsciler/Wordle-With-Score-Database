type Props = {
  timeMs: number
}

const styles = {
  fontSize: '18px',
}

const classes = "flex justify-center mt-4 ml-2 mr-2 text-center dark:text-white"

export const StopwatchText = ({ timeMs }: Props) => {
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

/*
const timeIncrementMs = 10
export const startTimer = (timeMs: number, setTimeMs: Dispatch<SetStateAction<number>>, interval: NodeJS.Timeout) => {
  interval = setInterval(() => {
    setTimeMs(timeMs + timeIncrementMs)
  }, timeIncrementMs)
}
export const stopTimer = (interval: NodeJS.Timeout) => {
  clearInterval(interval)
}
export const resetTimer = (setTimeMs: Dispatch<SetStateAction<number>>) => {
  setTimeMs(0)
}
*/
