import { Cell } from './Cell'

type Props = {
  solution: string
}

export const EmptyRow = ({ solution }: Props) => {
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
