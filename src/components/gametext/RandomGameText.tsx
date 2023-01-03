type Props = {
  isPlayingRandom: boolean,
  isGameAnimationComplete: boolean,
}

const styles = {
  fontSize: '18px',
}

const classes = "flex justify-center ml-2 mr-2 text-center dark:text-white"

export const RandomGameText = ({ isPlayingRandom, isGameAnimationComplete }: Props) => {
  if (!isPlayingRandom) {
    return <></>
  }
  return (
    <div style={styles} className={classes}>
      {isGameAnimationComplete ?
        "Press [Enter] to jump into a new random puzzle!"
        :
        "== Unlimited Mode =="
      }
    </div>
  )
}
