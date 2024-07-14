interface Props {children: React.ReactNode, width: string}
export const WhiteCardContainer = ({children, width}: Props) => {
  return (
    <article className={`flex gap-2 flex-col shadow-xl bg-white p-2 lg:p-5 rounded-2xl mt-5 lg:${width} appear-up`}>
        {children}
    </article>
  )
}
