interface Props {value: string, color: string}
export const SubTitle = ({value, color}: Props) => {
  return <h1 className={`tracking-wider text-3xl text-${color}`}>{value}</h1>
}
