interface Props { children: React.ReactNode }

export const FlexRowSection = ({children}: Props) => {
  return (
    <section className="flex flex-col lg:flex-row gap-5">
        {children}
    </section>
  )
}
