interface Props { children: React.ReactNode }

export const FlexColList = ({children}: Props) => {
  return (
    <section className="relative flex flex-col gap-2 max-h-[400px] lg:max-h-[500px] overflow-y-auto scrollbar-hide">
        {children}   
    </section>
  )
}
