import ReactHtmlParser from 'react-html-parser'

type Props = {
  text: string,
}

const styles = {
  fontSize: '18px',
}

const classes = "flex justify-center mb-3 ml-2 mr-2 text-center dark:text-white"
// const a_classes = "underline text-blue-600 hover:text-blue-800 visited:text-purple-600"

export const PromoText = ({ text }: Props) => {
  return (
    <div style={styles} className={classes}>
      <p>{ReactHtmlParser(text)}</p>
    </div>
  )
}

// const stringInterpolate = (text: string, args: any) => text.replace(/\${(\w+)}/g, (_, v) => args[v]); 
