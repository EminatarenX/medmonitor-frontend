interface Props {value: string, color: string}

export const Title = ({value, color = 'black'}: Props) => {
  return (
  <h2 className={`tracking-wider text-5xl text-${color} font-bold`}>{value}</h2>
  )
}
