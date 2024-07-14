interface Props {
  title: string;
  paragraph: string;
  children: React.ReactNode;
  bgColor?: string;
  data: string;
}

export const SmallSquareContainer = ({
  title,
  paragraph,
  children,
  bgColor,
  data,
}: Props) => {
  return (
    <article
      className={`${
        bgColor || "bg-neutral-800"
      } p-5 rounded-lg min-h-[180px] flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg hover:bg-neutral-700`}
    >
      <div className="text-neutral-400">{children}</div>
      <div>
        <h2 className="text-neutral-100 font-bold text-lg mb-1">
          {title}: <span className="text-neutral-300">{data}</span>
        </h2>
        <p className="text-neutral-400 text-sm">{paragraph}</p>
      </div>
    </article>
  );
};
